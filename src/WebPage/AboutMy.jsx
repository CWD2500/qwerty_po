import { useEffect, useRef } from "react";
import "./css/AboutMy.css";

export default function AboutMy() {
  const textRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (textRef.current) observer.observe(textRef.current);
    cardRefs.current.forEach((card) => observer.observe(card));
  }, []);

  return (
    <div className="about-container"  id="about">
      {/* العنوان */}
      <div className="about-header">
        <h1 className="about-title">
          عنّي
          <i className="fa-solid fa-user-tie" style={{ marginRight: "10px" }}></i>
        </h1>
      </div>

      {/* النص التعريفي */}
      <p ref={textRef} className="about-text">
        كمطور Full Stack، أملك خبرة في بناء تطبيقات الويب المتكاملة من الفكرة إلى النشر. 
      أركز على إنشاء حلول تقنية متكاملة تجمع بين تجربة المستخدم المميزة والأداء العالي، 
        مع الاهتمام بأفضل الممارسات في كتابة كود نظيف وقابل للصيانة والتطوير.
      </p>

      {/* شهادات */}
      <div className="certificates-grid">
        {[
          {
            title: "الشهادة الجامعية",
            institute: "جامعة حلب قسم هندسة البرمجيات قيد الدراسة",
            year: "----",
            icon: "fa-graduation-cap",
            color: "#3A86FF"
          },
          {
            title: "شهادة المعهد",
            institute: "المعهد التقاني للتقنية  الحاسوب قسم هندسة البرمجيات المرتبة الاولة",
            year: "2024",
            icon: "fa-laptop-code",
            color: "#8338EC"
          },
          {
            title: "الشهادة الثانوية",
            institute: "المدرسة الثانوية للتقنيات الحاسوب",
            year: "2022",
            icon: "fa-school",
            color: "#FF006E"
          },
        ].map((cert, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="certificate-card"
          >
            <div className="card-icon" style={{ backgroundColor: cert.color }}>
              <i className={`fa-solid ${cert.icon}`}></i>
            </div>
            <h3 className="certificate-title">{cert.title}</h3>
            <p className="certificate-institute">{cert.institute}</p>
            <div className="certificate-year" style={{ backgroundColor: cert.color }}>
              {cert.year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
