const CACHE_NAME = 'portfolio-offline-v2';
const API_URL = 'http://localhost:8000/api';



const checkConnectionAndRetry = async () => {
    try {
        const testResponse = await fetch(`${API_URL}/contact/token`, {
            method: 'GET',
            timeout: 5000
        });
        
        if (testResponse.ok) {
            await retryPendingMessages();
            return true;
        }
    } catch (error) {
        return false;
    }
};

const startConnectionChecker = () => {
    setInterval(async () => {
        const pendingMessages = await getPendingMessages();
        if (pendingMessages.length > 0) {
            await checkConnectionAndRetry();
        }
    }, 10000); 
};

const notifyAllClients = async (message) => {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
        client.postMessage(message);
    });
};

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    startConnectionChecker(); 
});

self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    
    if (url.includes('/contact/create/contacts') && event.request.method === 'POST') {
        event.respondWith(handleContactRequest(event.request));
    }
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NETWORK_STATUS') {
        if (event.data.isOnline) {
            setTimeout(() => retryPendingMessages(), 2000);
        }
    }
    
    if (event.data && event.data.type === 'MANUAL_RETRY') {
        retryPendingMessages();
    }
});

async function retryPendingMessages() {
    
    const pendingMessages = await getPendingMessages();
    // console.log(`📨 Found ${pendingMessages.length} pending messages`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const message of pendingMessages) {
        if (message.attempts >= 5) { 
            continue;
        }
        
        try {
            
            const token = await getCSRFToken();
            const fingerprint = await getClientFingerprint();
            
            const response = await fetch(`${API_URL}/contact/create/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': token,
                    'X-Client-Fingerprint': fingerprint
                },
                body: JSON.stringify({
                    name: message.name,
                    email: message.email,
                    message: message.message
                })
            });
            
            if (response.ok) {
                await deleteMessage(message.id);
                successCount++;
                
                await notifyAllClients({
                    type: 'MESSAGE_SENT',
                    messageId: message.id,
                    success: true
                });
            } else {
                throw new Error(`Server responded with ${response.status}`);
            }
        } catch (error) {
            await updateMessageAttempts(message.id, (message.attempts || 0) + 1);
            failCount++;
        }
    }
    
    
    await notifyAllClients({
        type: 'RETRY_COMPLETED',
        successCount,
        failCount,
        total: pendingMessages.length
    });
}

async function getCSRFToken() {
    try {
        const response = await fetch(`${API_URL}/contact/token`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            return data.token;
        } else {
            throw new Error('Token request failed');
        }
    } catch (error) {
        return 'offline-token-' + Date.now();
    }
}
const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ContactMessagesDB', 2);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            if (!db.objectStoreNames.contains('pending_messages')) {
                const store = db.createObjectStore('pending_messages', { 
                    keyPath: 'id', 
                    autoIncrement: true 
                });
                store.createIndex('timestamp', 'timestamp');
                store.createIndex('status', 'status');
            }
            
            // إنشاء جدول للمشاريع (للعرض دون اتصال)
            if (!db.objectStoreNames.contains('cached_projects')) {
                db.createObjectStore('cached_projects', { keyPath: 'id' });
            }
        };
    });
};

const storeOfflineMessage = async (messageData) => {
    try {
        const db = await initDB();
        const transaction = db.transaction(['pending_messages'], 'readwrite');
        const store = transaction.objectStore('pending_messages');
        
        const message = {
            name: messageData.name,
            email: messageData.email,
            message: messageData.message,
            timestamp: Date.now(),
            status: 'pending',
            attempts: 0
        };
        
        const request = store.add(message);
        
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('Failed to store message:', error);
        return false;
    }
};

const getPendingMessages = async () => {
    try {
        const db = await initDB();
        const transaction = db.transaction(['pending_messages'], 'readonly');
        const store = transaction.objectStore('pending_messages');
        
        return new Promise((resolve) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => resolve([]);
        });
    } catch (error) {
        return [];
    }
};

const deleteMessage = async (id) => {
    try {
        const db = await initDB();
        const transaction = db.transaction(['pending_messages'], 'readwrite');
        const store = transaction.objectStore('pending_messages');
        
        const request = store.delete(id);
        
        return new Promise((resolve, reject) => {
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error('Failed to delete message:', error);
        return false;
    }
};

const updateMessageAttempts = async (id, attempts) => {
    try {
        const db = await initDB();
        const transaction = db.transaction(['pending_messages'], 'readwrite');
        const store = transaction.objectStore('pending_messages');
        
        const message = await store.get(id);
        if (message) {
            message.attempts = attempts;
            if (attempts > 3) {
                message.status = 'failed';
            }
            await store.put(message);
        }
    } catch (error) {
        console.error('Failed to update message attempts:', error);
    }
};

// Service Worker Events
self.addEventListener('install', (event) => {
    // console.log('Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // console.log('Service Worker activated');
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    
    if (url.includes('/contact/create/contacts') && event.request.method === 'POST') {
        event.respondWith(handleContactRequest(event.request));
    }
    
    if (url.includes('/projects/all') && event.request.method === 'GET') {
        event.respondWith(handleProjectsRequest(event.request));
    }
});

async function handleContactRequest(request) {
    try {
        const response = await fetch(request.clone());
        
        if (response.ok) {
            return response;
        }
        throw new Error('Server responded with error');
    } catch (error) {
        // console.log('Server offline, storing message locally...');
        
        try {
            const requestData = await request.json();
            const stored = await storeOfflineMessage(requestData);
            
            if (stored) {
                return new Response(JSON.stringify({
                    success: true,
                    offline: true,
                    message: 'تم حفظ الرسالة  وسيتم إرسالها عند اتصال بالسيرفر'
                }), {
                    status: 200,
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-Offline-Storage': 'true'
                    }
                });
            } else {
                throw new Error('Failed to store message locally');
            }
        } catch (storageError) {
            console.error('Storage failed:', storageError);
            return new Response(JSON.stringify({
                success: false,
                message: 'فشل في حفظ الرسالة محلياً'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
}

async function handleProjectsRequest(request) {
    try {
        const response = await fetch(request);
        const projects = await response.json();
        
        await cacheProjects(projects);
        
        return response;
    } catch (error) {
        const cachedProjects = await getCachedProjects();
        return new Response(JSON.stringify(cachedProjects), {
            status: 200,
            headers: { 
                'Content-Type': 'application/json',
                'X-Cached-Response': 'true'
            }
        });
    }
}

async function cacheProjects(projects) {
    try {
        const db = await initDB();
        const transaction = db.transaction(['cached_projects'], 'readwrite');
        const store = transaction.objectStore('cached_projects');
        
        await store.clear();
        
        if (projects.data && Array.isArray(projects.data)) {
            for (const project of projects.data) {
                await store.add(project);
            }
        }
    } catch (error) {
        console.error('Failed to cache projects:', error);
    }
}

async function getCachedProjects() {
    try {
        const db = await initDB();
        const transaction = db.transaction(['cached_projects'], 'readonly');
        const store = transaction.objectStore('cached_projects');
        
        return new Promise((resolve) => {
            const request = store.getAll();
            request.onsuccess = () => {
                resolve({
                    data: request.result,
                    cached: true,
                    timestamp: Date.now()
                });
            };
            request.onerror = () => resolve({ data: [], cached: true });
        });
    } catch (error) {
        return { data: [], cached: true };
    }
}

self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync-messages') {
        // console.log('Background sync triggered');
        event.waitUntil(retryPendingMessages());
    }
});

async function retryPendingMessages() {
    // console.log('Retrying pending messages...');
    
    const pendingMessages = await getPendingMessages();
    // console.log(`Found ${pendingMessages.length} pending messages`);
    
    for (const message of pendingMessages) {
        if (message.attempts >= 3) {
            continue;
        }
        
        try {
            const token = await getCSRFToken();
            const fingerprint = await getClientFingerprint();
            
            const response = await fetch(`${API_URL}/contact/create/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': token,
                    'X-Client-Fingerprint': fingerprint
                },
                body: JSON.stringify({
                    name: message.name,
                    email: message.email,
                    message: message.message
                })
            });
            
            if (response.ok) {
                // console.log(`Message ${message.id} sent successfully`);
                await deleteMessage(message.id);
            } else {
                throw new Error('Server responded with error');
            }
        } catch (error) {
            // console.log(`Failed to send message ${message.id}:`, error);
            await updateMessageAttempts(message.id, (message.attempts || 0) + 1);
        }
    }
}

async function getCSRFToken() {
    try {
        const response = await fetch(`${API_URL}/contact/token`);
        const data = await response.json();
        return data.token;
    } catch (error) {
        return 'offline-token';
    }
}

async function getClientFingerprint() {
    try {
        const components = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset()
        ].join('|');
        
        const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(components));
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (error) {
        return 'offline-fingerprint';
    }
}

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NETWORK_STATUS') {
        if (event.data.isOnline) {
            retryPendingMessages();
        }
    }
});
