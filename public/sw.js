const CACHE_NAME = 'portfolio-offline-v2';
const API_URL = 'http://localhost:8000/api';


// ... (الكود السابق يبقى كما هو)

// ✅ دالة جديدة للتحقق من الاتصال وإعادة الإرسال
const checkConnectionAndRetry = async () => {
    try {
        // محاولة الاتصال بالسيرفر
        const testResponse = await fetch(`${API_URL}/contact/token`, {
            method: 'GET',
            timeout: 5000
        });
        
        if (testResponse.ok) {
            // console.log('✅ Server is back online, retrying messages...');
            await retryPendingMessages();
            return true;
        }
    } catch (error) {
        // console.log('❌ Server still offline');
        return false;
    }
};

// ✅ التحقق الدوري من الاتصال
const startConnectionChecker = () => {
    setInterval(async () => {
        const pendingMessages = await getPendingMessages();
        if (pendingMessages.length > 0) {
            await checkConnectionAndRetry();
        }
    }, 10000); // التحقق كل 10 ثواني
};

// ✅ إشعار جميع Tabs عند اتصال الإنترنت
const notifyAllClients = async (message) => {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
        client.postMessage(message);
    });
};

// ✅ Service Worker Events
self.addEventListener('install', (event) => {
    // console.log('🚀 Service Worker installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // console.log('🔛 Service Worker activated');
    event.waitUntil(self.clients.claim());
    startConnectionChecker(); // بدء المراقبة
});

// ✅ اعتراض طلبات الشبكة
self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    
    if (url.includes('/contact/create/contacts') && event.request.method === 'POST') {
        event.respondWith(handleContactRequest(event.request));
    }
});

// ✅ معالجة الرسائل من الصفحة
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NETWORK_STATUS') {
        if (event.data.isOnline) {
            // console.log('📡 Page notified us that network is online');
            setTimeout(() => retryPendingMessages(), 2000);
        }
    }
    
    if (event.data && event.data.type === 'MANUAL_RETRY') {
        // console.log('🔄 Manual retry triggered');
        retryPendingMessages();
    }
});

// ✅ تحسين دالة إعادة الإرسال
async function retryPendingMessages() {
    // console.log('🔄 Starting to retry pending messages...');
    
    const pendingMessages = await getPendingMessages();
    // console.log(`📨 Found ${pendingMessages.length} pending messages`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (const message of pendingMessages) {
        if (message.attempts >= 5) { // زيادة الحد إلى 5 محاولات
            // console.log(`⏩ Skipping message ${message.id} - too many attempts`);
            continue;
        }
        
        try {
            // console.log(`🔄 Retrying message ${message.id}...`);
            
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
                // console.log(`✅ Message ${message.id} sent successfully!`);
                await deleteMessage(message.id);
                successCount++;
                
                // ✅ إشعار الصفحة بالنجاح
                await notifyAllClients({
                    type: 'MESSAGE_SENT',
                    messageId: message.id,
                    success: true
                });
            } else {
                throw new Error(`Server responded with ${response.status}`);
            }
        } catch (error) {
            // console.log(`❌ Failed to send message ${message.id}:`, error.message);
            await updateMessageAttempts(message.id, (message.attempts || 0) + 1);
            failCount++;
        }
    }
    
    // console.log(`📊 Retry completed: ${successCount} success, ${failCount} failed`);
    
    // ✅ إشعار الصفحة بنتيجة المحاولة
    await notifyAllClients({
        type: 'RETRY_COMPLETED',
        successCount,
        failCount,
        total: pendingMessages.length
    });
}

// ✅ تحسين دالة الحصول على Token
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
        // console.log('⚠️ Using offline token');
        return 'offline-token-' + Date.now();
    }
}
// تهيئة IndexedDB
const initDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ContactMessagesDB', 2);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // إنشاء جدول الرسائل المعلقة
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

// تخزين رسالة محلياً
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

// جلب جميع الرسائل المعلقة
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

// حذف رسالة بعد إرسالها بنجاح
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

// تحديث عدد محاولات الإرسال
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

// اعتراض طلبات الشبكة
self.addEventListener('fetch', (event) => {
    const url = event.request.url;
    
    // اعتراض طلبات إرسال الرسائل
    if (url.includes('/contact/create/contacts') && event.request.method === 'POST') {
        event.respondWith(handleContactRequest(event.request));
    }
    
    // اعتراض طلبات جلب المشاريع للتخزين المؤقت
    if (url.includes('/projects/all') && event.request.method === 'GET') {
        event.respondWith(handleProjectsRequest(event.request));
    }
});

// معالجة طلبات الاتصال
async function handleContactRequest(request) {
    try {
        // محاولة الإرسال إلى السيرفر أولاً
        const response = await fetch(request.clone());
        
        if (response.ok) {
            return response;
        }
        throw new Error('Server responded with error');
    } catch (error) {
        // إذا فشل الإرسال، نخزن محلياً
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

// معالجة طلبات المشاريع
async function handleProjectsRequest(request) {
    try {
        const response = await fetch(request);
        const projects = await response.json();
        
        // تخزين المشاريع محلياً
        await cacheProjects(projects);
        
        return response;
    } catch (error) {
        // إذا لم يكن هناك اتصال، نعيد البيانات المخزنة
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

// تخزين المشاريع محلياً
async function cacheProjects(projects) {
    try {
        const db = await initDB();
        const transaction = db.transaction(['cached_projects'], 'readwrite');
        const store = transaction.objectStore('cached_projects');
        
        // مسح البيانات القديمة
        await store.clear();
        
        // تخزين البيانات الجديدة
        if (projects.data && Array.isArray(projects.data)) {
            for (const project of projects.data) {
                await store.add(project);
            }
        }
    } catch (error) {
        console.error('Failed to cache projects:', error);
    }
}

// جلب المشاريع المخزنة محلياً
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

// إعادة إرسال الرسائل المعلقة عند اتصال الإنترنت
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync-messages') {
        // console.log('Background sync triggered');
        event.waitUntil(retryPendingMessages());
    }
});

// محاولة إعادة إرسال الرسائل المعلقة
async function retryPendingMessages() {
    // console.log('Retrying pending messages...');
    
    const pendingMessages = await getPendingMessages();
    // console.log(`Found ${pendingMessages.length} pending messages`);
    
    for (const message of pendingMessages) {
        if (message.attempts >= 3) {
            // تخطي الرسائل التي فشلت كثيراً
            continue;
        }
        
        try {
            // الحصول على token جديد
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

// الحصول على CSRF Token
async function getCSRFToken() {
    try {
        const response = await fetch(`${API_URL}/contact/token`);
        const data = await response.json();
        return data.token;
    } catch (error) {
        return 'offline-token';
    }
}

// إنشاء بصمة العميل
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

// إشعار الصفحة عند اتصال الإنترنت
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'NETWORK_STATUS') {
        if (event.data.isOnline) {
            // محاولة إرسال الرسائل المعلقة عند اتصال الإنترنت
            retryPendingMessages();
        }
    }
});