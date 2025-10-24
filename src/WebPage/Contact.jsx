import React, { useRef, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "./css/Contact.css";

const API_BASE_URL = "http://localhost:8000/api";

export default function Contact() {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [csrfToken, setCsrfToken] = useState('');
    const [clientFingerprint, setClientFingerprint] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [pendingMessagesCount, setPendingMessagesCount] = useState(0);

    const checkPendingMessages = async () => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'GET_PENDING_COUNT'
            });
        }
    };

    const triggerManualRetry = () => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'MANUAL_RETRY'
            });
            toast.info('جاري إعادة إرسال الرسائل المعلقة...');
        }
    };

    useEffect(() => {
        const handleOnline = async () => {
            // console.log('🌐 Internet connection restored');
            setIsOnline(true);
            
            setTimeout(() => {
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        type: 'NETWORK_STATUS',
                        isOnline: true
                    });
                }
                checkPendingMessages();
                toast.info('تم استعادة الاتصال، جاري إرسال الرسائل المعلقة...');
            }, 3000);
        };

        const handleOffline = () => {
            // console.log(' Internet connection lost');
            setIsOnline(false);
            toast.warning('فقدت الاتصال بالإنترنت');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        checkPendingMessages();

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Service Worker
    useEffect(() => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            const handleServiceWorkerMessage = (event) => {
                const { type, successCount, failCount, total } = event.data;
                
                if (type === 'RETRY_COMPLETED') {
                    if (successCount > 0) {
                        toast.success(`تم إرسال ${successCount} رسالة تلقائياً`);
                    }
                    if (failCount > 0) {
                        toast.info(`لم نتمكن من إرسال ${failCount} رسالة`);
                    }
                    checkPendingMessages();
                }
                
                if (type === 'MESSAGE_SENT') {
                    // console.log('✅ Message sent successfully via Service Worker');
                }

                if (type === 'PENDING_COUNT') {
                    setPendingMessagesCount(total || 0);
                }
            };

            navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);

            return () => {
                navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
            };
        }
    }, []);

    // Service Worker
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(() => {
                // console.log('Service Worker is ready');
            });
        }
    }, []);


    const initializeSecurity = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        try {
            const response = await axios.get(`${API_BASE_URL}/contact/token`, {
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            setCsrfToken(response.data.token);
            
            const fingerprint = await generateFingerprint();
            setClientFingerprint(fingerprint);
            
            setIsInitialized(true);
        } catch (error) {
            clearTimeout(timeoutId);
            setCsrfToken('demo-token-' + Date.now());
            
            // إنشاء بصمة وهمية
            const fakeFingerprint = await generateFingerprint();
            setClientFingerprint(fakeFingerprint);
            
            setIsInitialized(true);
        }
    };

    const generateFingerprint = async () => {
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
            return 'fp-' + Math.random().toString(36).substr(2, 16);
        }
    };

    useEffect(() => {
        initializeSecurity();
    }, []);

    const validateForm = useCallback((data) => {
        const errors = {};
        
        const maliciousPatterns = [
            /<script/i, /javascript:/i, /on\w+\s*=/i,
            /eval\s*\(/i, /union\s+select/i, /drop\s+table/i,
        ];

        if (!data.name.trim() || data.name.length < 2) errors.name = 'الاسم مطلوب';
        if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'البريد الإلكتروني غير صالح';
        if (!data.message.trim() || data.message.length < 10) errors.message = 'الرسالة يجب أن تكون على الأقل 10 أحرف';

        for (const [field, value] of Object.entries(data)) {
            for (const pattern of maliciousPatterns) {
                if (pattern.test(value.toLowerCase())) {
                    errors[field] = 'المحتوى يحتوي على نص غير مسموح';
                    break;
                }
            }
        }

        return errors;
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isInitialized) {
            toast.info('جاري تهيئة النظام...');
            return;
        }

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0];
            toast.error(firstError);
            return;
        }

        setLoading(true);

        try {
            const requestData = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                csrf_token: csrfToken,
                client_fingerprint: clientFingerprint
            };

            const response = await axios.post(
                `${API_BASE_URL}/contact/create/contacts`, 
                requestData, 
                {
                    headers: {
                        'X-CSRF-Token': csrfToken,
                        'X-Client-Fingerprint': clientFingerprint,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    timeout: 5000
                }
            );

            if (response.data.message) {
                if (response.data.offline) {
                    toast.info(response.data.message);
                } else {
                    toast.success(response.data.message);
                }
                setFormData({ name: '', email: '', message: '' });
                
                if (response.data.new_token) {
                    setCsrfToken(response.data.new_token);
                }
            }

        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                
                if (status === 419) {
                    await initializeSecurity();
                    toast.info('جاري تحديث النظام الأمني...');
                } else if (status === 422) {
                    const errors = error.response.data?.errors;
                    if (errors) {
                        const firstErrorKey = Object.keys(errors)[0];
                        const firstError = errors[firstErrorKey];
                        if (Array.isArray(firstError)) {
                            toast.error(firstError[0]);
                        } else {
                            toast.error(firstError);
                        }
                    } else {
                        toast.error('البيانات المدخلة غير صالحة');
                    }
                } else if (status >= 500) {
                    toast.info('تم حفظ الرسالة  وسيتم إرسالها عند اتصال الإنترنت');
                    setFormData({ name: '', email: '', message: '' });
                }
            } else if (error.request) {
                toast.info('تم حفظ الرسالة  وسيتم إرسالها عند اتصال الإنترنت');
                setFormData({ name: '', email: '', message: '' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-container" id="contact">
            <div className="connection-status">
                {!isOnline && (
                    <div className="offline-indicator">
                        <i className="fa-solid fa-wifi"></i>
                        <span>أنت غير متصل بالإنترنت - يمكنك إرسال الرسائل وسيتم حفظها محلياً</span>
                    </div>
                )}
                
                {isOnline && pendingMessagesCount > 0 && (
                    <div className="pending-messages-indicator">
                        <i className="fa-solid fa-envelope"></i>
                        <span>لديك {pendingMessagesCount} رسالة معلقة</span>
                        <button onClick={triggerManualRetry} className="retry-btn">
                            إعادة الإرسال الآن
                        </button>
                    </div>
                )}
            </div>

            <div className="contact-header">
                <h1 className="contact-title">
                    تواصل معنا
                    <i className="fa-solid fa-envelope" style={{ marginRight: "10px" }}></i>
                </h1>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <h3>الهاتف</h3>
                        <p>+963 --- --- ---</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <h3>البريد الإلكتروني</h3>
                        <p>codeforsyrian@gmail.com</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <h3>العنوان</h3>
                        <p>سوريا - حلب</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <i className="fa-solid fa-clock"></i>
                        </div>
                        <h3>أوقات العمل</h3>
                        <p>الأحد - الخميس<br />9:00 ص - 5:00 م</p>
                    </div>
                </div>

                {/* نموذج الاتصال */}
                <div className="contact-form-container">
                    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">الاسم الكامل</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                maxLength="100"
                                placeholder="أدخل اسمك الكامل"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">البريد الإلكتروني</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                maxLength="150"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">الرسالة</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                maxLength="2000"
                                placeholder="أدخل رسالتك هنا..."
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="submit-btn" 
                            disabled={loading || !isInitialized}
                        >
                            {loading ? (
                                <div className="loading-dots">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            ) : !isInitialized ? (
                                'جاري التهيئة...'
                            ) : (
                                <>
                                    إرسال الرسالة
                                    <i className="fa-solid fa-paper-plane"></i>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}