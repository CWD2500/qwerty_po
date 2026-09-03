import { useState, useEffect, useRef } from "react";
import b2cMarketplaceImg from "../assets/a1.png";
import eduflowImg from "../assets/dashboard.jpg";
import "./css/Projects.css";

// بيانات مشاريع وهمية
const mockProjects = [
  {
    id: 1,
    name: "B2C E-Commerce Marketplace",
    description: "منصة تجارة إلكترونية متكاملة لبيع وشراء الأدوات المستعملة لضمان تنظيم العلاقة بين البائع والمشتري بشكل آمن ومستقر، مع فصل تام للصلاحيات ونظام محاسبي وإشرافي دقيق بنسبة عمولة 2% للمنصة.\n\n📖 عن المشروع:\nمنصة متطورة تعتمد نموذج Consumer-to-Business (B2C) لربط المشترين بالبائعين تحت إدارة تحكم شاملة للـ Admin لمنع الاحتيال.\n\n✨ المميزات الرئيسية:\n• إدارة المستخدمين والأدوار (RBAC): أدوار مخصصة (Buyer, Seller, Admin) مع حماية 2FA و Google OAuth والتحقق عبر OTP.\n• لوحة تحكم البائع: إدارة المنتجات والطلبات، إشعارات لحظية، ونظام محاسبي يخصم تلقائياً عمولة المنصة 2%.\n• لوحة تحكم الأدمن: مراجعة المنتجات والموافقة عليها، إدارة الفئات، تقارير أرباح لحظية وإدارة شاملة للحسابات.\n• تجربة المشتري: محرك بحث دقيق مع الفلترة، إضافة للسلة والمفضلة، تتبع الطلبات مع خاصية Soft Delete.\n• تفاعل وأداء متقدم: معاينة الصور بـ Zoom، معارض SwiperJS، حركة انسيابية بـ AOS و Framer Motion، مع كاش سريع للأداء.\n\n🛠️ التقنيات المستخدمة:\nLaravel 12, React 19, MySQL, Redux, Tailwind CSS, Google OAuth, 2FA, RESTful APIs.",
    picture: b2cMarketplaceImg,
    tags: ["Laravel 12", "React 19" , "Tailwind CSS", "MySQL"],
    github_url: "https://github.com/CWD2500/MultiVendor-B2C-Marketplace",
    linkedin_url: "https://www.linkedin.com/posts/muhammed-soliman-b95635335_%D8%AA%D9%85-%D8%A7%D9%86%D9%87%D8%A7%D8%A1-%D8%AA%D8%B7%D9%88%D9%8A%D8%B1-%D8%A7%D9%84%D9%85%D8%B4%D8%B1%D9%88%D8%B9-%D8%AA%D8%AD%D8%AA-%D8%A5%D8%B4%D8%B1%D8%A7%D9%81%D9%8A-%D9%85%D8%AD%D9%85%D8%AF-%D8%B3%D9%84%D9%8A%D9%85%D8%A7%D9%86-activity-7394858637623468032-zYPT",
    facebook_url: null
  },
  {
    id: 2,
    name: "EduFlow ERP",
    description: "نظام إدارة مؤسسي عالي الأداء ومُصمم لأتمتة سير العمل الأكاديمي والإداري للمؤسسات التعليمية الكبيرة باستخدام Laravel و MySQL.\n\nأبرز المميزات المعمارية:\n• محرك الانتقال الآلي: حساب النتائج وتصنيف ونقل الراسبين تلقائياً لنظام التكميلي.\n• إدارة المصفوفة الأكاديمية: ربط المعلمين بالمواد والتخصصات بدقة وعلاقات مرنة.\n• لوحة تحليلات لحظية: رسوم بيانية لعرض نسب النجاح والاعتراضات ومؤشرات الأداء.\n• أمان وصلاحيات صارمة: نظام RBAC متقدم لفصل صلاحيات الأدمن والمعلم والطالب.",
    picture: eduflowImg,
    tags: ["Laravel", "MySQL", "ERP"],
    github_url: "https://github.com/CWD2500/EduFlow-ERP",
    linkedin_url: null,
    facebook_url: null
  },
  {
    id: 3,
    name: "JobStream Recruit System",
    description: "منصة توظيف إلكترونية متكاملة تهدف لإدارة دورة التوظيف الكاملة والربط بين الكفاءات والشركات عبر بيئة تقنية متقدمة وهيكلية بيانات مكونة من 12 جدولاً مرتبطة بإحكام.\n\n📖 عن المشروع:\nنظام إدارة توظيف استراتيجي (Enterprise ATS) يلغي العمليات التقليدية المجزأة، ويقوم بأتمتة التواصل والتنسيق بين المتقدمين وأصحاب العمل مع الحفاظ على سلامة البيانات ودقة الأدوار.\n\n✨ المميزات الرئيسية:\n• بناء السيرة الذاتية التفاعلي: إنشاء ملف رقمي شامل يربط المؤهلات، والخبرات، والمهارات، والشهادات المهنية.\n• تتبع الطلبات (ATS Dashboard): لوحة تحكم متقدمة لأصحاب العمل لمراجعة المتقدمين، وتحديث حالات الطلبات، مع أتمتة الإشعارات اللحظية.\n• نظام إشعارات ثنائي الاتجاه (Bidirectional): تنبيهات فورية للمتقدمين بحالة القبول أو الرفض مع إمكانية إضافة تعليمات خاصة.\n• إدارة الأدوار والصلاحيات (RBAC): فصل صارم لمنع تداخل العمليات بين المتقدمين (Seekers)، وأصحاب العمل (Employers)، والمشرفين (Admins).\n• البحث والفلترة المتقدمة: محرك بحث متعدد المعايير (حسب الموقع، التخصص، نوع العمل، والمستوى الخبري).\n\n🛠️ التقنيات المستخدمة:\nPython, Django, MySQL (12 Tables Architecture), RDBMS, RESTful APIs, RBAC, In-app & Email Notification Engine.",
    picture: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80", // صورة من النت خاصة بالمشروع 3 فقط
    tags: ["Python", "Django", "MySQL"],
    github_url: "https://github.com/CWD2500/JobStream-Recruit-System", 
    linkedin_url: null,
    facebook_url: null
  },
{
    id: 4,
    name: "Pro-Market E-Commerce Solution",
    description: "منصة تجارة إلكترونية متقدمة مستوحاة من تجربة تسوق Amazon تم بناؤها باستخدام Python و Django. تتميز بمحرك بحث وفلترة ذكي، وسلة تسوق ديناميكية، وهيكلية متعددة التطبيقات لتنظيم إدارة المنتجات والطلبات.\n\n📖 عن المشروع:\nنظام متكامل لإدارة عمليات التجزئة المعقدة، يتجاوز العمليات الأساسية عبر تطبيق أنماط معمارية متقدمة مثل Context Processors و Custom Decorators لتحسين الأداء وتوفير تجربة تسوق واقعية.\n\n✨ المميزات الرئيسية:\n• فلترة وبحث متقدم (Amazon Style): فلترة ديناميكية حسب الفئة، نطاق السعر، العلامة التجارية، والمواصفات مع تقسيم صفحات متجاوب (Pagination).\n• هندسة المنتجات ومعاينتها: معرض صور تفاعلي (4 صور لكل منتج)، خاصية Zoom للصور، وسلايدرات تفاعلية بـ Swiper.js.\n• محرك اقتراح المنتجات: اقتراح تلقائي للمنتجات ذات الصلة بناءً على الفئات والتاغات التشابهية.\n• إدارة السلة والمفضلة: سلة تسوق ذكية تعتمد على Sessions، ونظام حفظ المنتجات المفضلة (Wishlist).\n• لوحة تحكم وإدارة طلبات: لوحة Admin احترافية لإدارة المخزون، والمنتجات، والطلبات، مع لوحة خاصة بالعميل لتتبع حالة الشراء.\n\n🛠️ التقنيات المستخدمة:\nPython 3.8+, Django, MySQL, HTML5/CSS3, Bootstrap 5, JavaScript (jQuery), Dynamic Querysets, REST Architecture.",
    picture: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    tags: ["Python", "Django", "MySQL", "Bootstrap"],
    github_url: "https://github.com/CWD2500/E-Commerce-market",
    linkedin_url: null,
    facebook_url: null
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef([]);

  useEffect(() => {
    const loadProjects = () => {
      setLoading(true);
      
      setTimeout(() => {
        setProjectsData(mockProjects);
        setLoading(false);
        
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
      }, 800);
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
            المشاريع <i className="fa-solid fa-rocket"></i>
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
    <div className="projects-container" id="projects">
      <div className="projects-header">
        <h1 className="projects-title">
          المشاريع <i className="fa-solid fa-rocket"></i>
        </h1>
      </div>

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
                {project.tags ? (
                  project.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag">{tag}</span>
                  ))
                ) : (
                  <>
                    <span className="tech-tag">Web</span>
                    <span className="tech-tag">React</span>
                  </>
                )}
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

      {/* النافذة المنبثقة Modal */}
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
