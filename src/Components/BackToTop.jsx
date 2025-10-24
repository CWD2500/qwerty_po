import { useState, useEffect } from 'react';
import './BackToTop.css';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // التحقق من موقع التمرير
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // التمرير للأعلى
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`back-to-top ${isVisible ? 'show' : ''}`}>
      <button 
        onClick={scrollToTop}
        className="back-to-top-btn"
        aria-label="العودة للأعلى"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}