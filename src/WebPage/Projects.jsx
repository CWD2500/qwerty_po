import { useState, useEffect, useRef } from "react";
import "./css/Projects.css";

// بيانات مشاريع وهمية
const mockProjects = [
  {
    id: 1,
    name: "متجر إلكتروني",
    description: "متجر إلكتروني متكامل بتقنيات حديثة مع نظام دفع آمن وإدارة للمخزون. يدعم اللغة العربية بشكل كامل ويتوافق مع جميع الأجهزة.\n\nالمميزات:\n• واجهة مستخدم متجاوبة\n• نظام دفع إلكتروني آمن\n• إدارة مخزون تلقائية\n• تقارير مبيعات مفصلة\n• دعم متعدد اللغات",
    picture: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    github_url: "https://github.com/example/ecommerce",
    linkedin_url: "https://linkedin.com/company/example",
    facebook_url: "https://facebook.com/example"
  },
  {
    id: 2,
    name: "منصة تعليمية",
    description: "منصة تعليمية تفاعلية تقدم دورات في البرمجة وتطوير الويب. تحتوي على نظام متابعة للطلاب وتقييم آلي.\n\nالمميزات:\n• دورات تفاعلية\n• نظام تقييم آلي\n• متابعة تقدم الطلاب\n• شهادات معتمدة\n• مجتمع تعليمي",
    picture: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400",
    github_url: "https://github.com/example/learning-platform",
    linkedin_url: "https://linkedin.com/company/example",
    facebook_url: null
  },
  {
    id: 3,
    name: "تطبيق إدارة المهام",
    description: "تطبيق ويب لإدارة المهام والمشاريع الشخصية والجماعية. يتضمن تقويم ومهام متعددة وإشعارات.\n\nالمميزات:\n• إدارة مهام فردية وجماعية\n• تقويم متكامل\n• إشعارات تذكير\n• تقارير إنتاجية\n• تكامل مع التطبيقات الأخرى",
    picture: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
    github_url: "https://github.com/example/task-manager",
    linkedin_url: null,
    facebook_url: "https://facebook.com/example"
  },
  {
    id: 4,
    name: "موقع شخصي",
    description: "موقع شخصي تفاععي يعرض السيرة الذاتية والمشاريع والمهارات. مصمم بتقنيات حديثة مع تحسين لمحركات البحث.\n\nالمميزات:\n• تصميم متجاوب\n• تحسين SEO\n• نموذج تواصل\n• معرض المشاريع\n• مدونة شخصية",
    picture: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    github_url: "https://github.com/example/portfolio",
    linkedin_url: "https://linkedin.com/in/example",
    facebook_url: "https://facebook.com/example"
  },
  {
    id: 5,
    name: "نظام حجز مواعيد",
    description: "نظام متكامل لحجز المواعيد للمؤسسات والمراكز الطبية. يدعم إدارة المواعيد وإشعارات العملاء.\n\nالمميزات:\n• حجز مواعيد آلي\n• إشعارات SMS وبريد\n• إدارة الموظفين\n• تقارير الحضور\n• دفع إلكتروني",
    picture: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
    github_url: "https://github.com/example/booking-system",
    linkedin_url: "https://linkedin.com/company/example",
    facebook_url: null
  },
  {
    id: 6,
    name: "تطبيق الطقس",
    description: "تطبيق طقس بتقنيات حديثة يعرض حالة الطقس الحالية والتوقعات لـ7 أيام قادمة.\n\nالمميزات:\n• توقعات دقيقة\n• واجهة بصرية جذابة\n• إشعارات تغيير الطقس\n• دعم مواقع متعددة\n• بدون إعلانات",
    picture: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400",
    github_url: "https://github.com/example/weather-app",
    linkedin_url: null,
    facebook_url: "https://facebook.com/example"
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef([]);

  useEffect(() => {
    // استخدام البيانات الوهمية مباشرة بدون محاولة الاتصال بالسيرفر
    const loadProjects = () => {
      setLoading(true);
      
      // محاكاة وقت التحميل
      setTimeout(() => {
        setProjectsData(mockProjects);
        setLoading(false);
        
        // تفعيل الـ observer بعد تحميل البيانات
        setTimeout(() => {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("visible");
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.1 }
          );

          cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
          });
        }, 100);
      }, 800); // محاكاة وقت التحميل
    };

    loadProjects();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };



  if (loading) {
    return (
      <div className="projects-container">
        <div className="projects-header">
          <h1 className="projects-title">
            المشاريع 
            <i className="fa-solid fa-rocket"></i>
          </h1>
        </div>
        <div className="three-color-loading">
          <div className="loading-dots">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
          </div>
          <p>جاري تحميل المشاريع...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container" id="projects" >
      {/* العنوان */}
      <div className="projects-header">
        <h1 className="projects-title">
          المشاريع 
          <i className="fa-solid fa-rocket"></i>
        </h1>
      </div>

      {/* شبكة المشاريع */}
      <div className="projects-cards">
        {projectsData.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="project-card"
          >
            <div className="project-image-container">
              <img 
                src={project.picture} 
                alt={project.name} 
                className="project-img" 
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1556655848-f3a7049761e6?w=400';
                }}
              />
              <div className="project-overlay">
                <button 
                  className="view-project-btn"
                  onClick={() => openModal(project)}
                >
                  عرض المشروع
                </button>
              </div>
            </div>
            
            <div className="project-content">
              <h3 className="project-title">{project.name}</h3>
              <p className="project-desc">
                {project.description ? 
                  (project.description.length > 100 
                    ? `${project.description.substring(0, 100)}...` 
                    : project.description) 
                  : "لا يوجد وصف للمشروع"
                }
              </p>
              
              <div className="project-tech">
                <span className="tech-tag">Web</span>
                <span className="tech-tag">Development</span>
                <span className="tech-tag">React</span>
              </div>

              <div className="project-links">
                {project.github_url && (
                  <a href={project.github_url} className="project-link" title="GitHub" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                )}
                {project.linkedin_url && (
                  <a href={project.linkedin_url} className="project-link" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                )}
                {project.facebook_url && (
                  <a href={project.facebook_url} className="project-link" title="Facebook" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* النافذة المنبثقة */}
      {isModalOpen && selectedProject && (
        <div className="simple-modal-overlay" onClick={closeModal}>
          <div className="simple-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="simple-modal-close" onClick={closeModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <div className="simple-modal-header">
              <h2 className="simple-modal-title">{selectedProject.name}</h2>
            </div>

            <div className="simple-modal-body">
              <div className="long-description">
                {selectedProject.description ? (
                  selectedProject.description.split('\n').map((paragraph, index) => (
                    paragraph.trim() ? (
                      <p key={index} className="description-paragraph">
                        {paragraph.trim()}
                      </p>
                    ) : (
                      <br key={index} />
                    )
                  ))
                ) : (
                  <p className="description-paragraph">لا يوجد وصف مفصل لهذا المشروع</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}