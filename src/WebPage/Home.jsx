import { useRef } from "react";
import './css/home.css';
import profileImage from '../assets/icon/muhammed.jpg';
import chatbox from "../assets/icon/chatbox.png";
export default function Home() {
  const imgRef = useRef();

  const handleMouseMove = (e) => {
    const el = imgRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;
    el.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    imgRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div className="min-h-screen px-16 py-20 flex justify-center">
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-20 items-start">
        
   
        <div className="flex-1 flex flex-col justify-start content-wrapper text-content">
          <h2 className="text-log mb-2">المهندس محمد سليمان</h2>

          <p className="mb-6 text-[20px] font-bold">
            <span className="text-white">تخصص</span>{" "}
            <span className="font-bold text-grad">Full Stack Developer</span>
          </p>

          <p className="text-white font-bold text-[20px] max-w-3xl mx-auto leading-relaxed">
          متخصص في تطوير الحلول البرمجية المتكاملة، أجمع بين واجهات مستخدم تفاعلية 
          وبنى خلفية مستقرة وقابلة للتوسع.
          </p>

          <div className="button-youtube" >
                   <a href="https://github.com/CWD2500" rel="noopener noreferrer" target="_blank"  className="text-links-button flex items-center gap-2">
                       Github <i className="fab fa-github"></i>
                </a>
                 <a href="https://www.linkedin.com/in/muhammed-soliman-b95635335" rel="noopener noreferrer" target="_blank" className="text-links-button flex items-center gap-2">
                        Linked In <i className="fab fa-linkedin-in"></i>
                </a>
                   <a href="https://www.facebook.com/muhammed.soliman.658838/" rel="noopener noreferrer" target="_blank"   className="text-links-button flex items-center gap-2">
                       FaceBook <i className="fab fa-facebook-f"></i>
                </a>
            <a href="https://www.youtube.com/@Learnprogramming_codeforsyria/playlists" target="_blank"   rel="noopener noreferrer" className="text-links-button flex items-center gap-2  "  style={{marginTop :"16px",   width:"375px", textAlign:"center"}}>
                       Youtube <i className ="fab fa-youtube"></i>
                </a>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center md:justify-end px-4 md:px-8">
          <div
            className="profile-image-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img ref={imgRef} src={profileImage} alt="صورة" />
          </div>

      <div className="stars-container">
        <div className="absolute top-2 left-2 w-3 h-3 star star-yellow"></div>
        <div className="absolute bottom-4 right-6 w-4 h-4 star star-pink"></div>
        <div className="absolute top-14 right-12 w-2 h-2 star star-blue"></div>
        
        {/* نجوم إضافية */}
        {/* <div className="absolute top-6 right-2 w-3 h-3 star star-purple"></div>
        <div className="absolute bottom-12 left-4 w-2 h-2 star star-cyan"></div>
        <div className="absolute top-20 left-8 w-4 h-4 star star-yellow"></div> */}
        
        <div className="absolute top-4 right-16 w-2 h-2 star star-pink"></div>
        <div className="absolute bottom-8 left-12 w-3 h-3 star star-blue"></div>
        <div className="absolute top-28 right-4 w-3 h-3 star star-purple"></div>
        
        {/* النجوم الإضافية */}
        {/* <div className="absolute bottom-2 left-16 w-2 h-2 star star-cyan"></div>
        <div className="absolute top-10 left-20 w-4 h-4 star star-yellow"></div>
        <div className="absolute bottom-16 right-14 w-3 h-3 star star-pink"></div> */}
        
        <div className="absolute top-32 left-12 w-2 h-2 star star-blue"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 star star-purple"></div>
        <div className="absolute top-24 left-24 w-4 h-4 star star-cyan"></div>
      </div>
        </div>
      </div>
    </div>
  );
}
