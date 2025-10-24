import React from 'react';
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="portfolio-footer">
      <div className="footer-content">
        {/* القسم الأول: الروابط السريعة */}
        <div className="footer-section">
          <h4>التنقل السريع</h4>
          <div className="footer-links">
          
            <a href="#about">عنّي</a>
            <a href="#skills">المهارات</a>
            <a href="#projects">المشاريع</a>
            <a href="#contact">تواصل معنا</a>
          </div>
        </div>

        {/* القسم الثاني: معلومات الاتصال */}
        <div className="footer-section">
          <h4>معلومات التواصل</h4>
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>codeforsyrian@gmail.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+963 --- --- ---</span>
            </div>
          </div>
        </div>

        {/* القسم الثالث: وسائل التواصل الاجتماعي */}
        <div className="footer-section">
          <h4>وسائل التواصل</h4>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-telegram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* الجزء السفلي */}
      <div className="footer-bottom">
        <div className="footer-divider"></div>
        <p>© 2025 جميع الحقوق محفوظة | تم التطوير بالحب والإبداع</p>
      </div>
    </footer>
  );
}