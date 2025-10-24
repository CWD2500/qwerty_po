import "./css/Skills.css";

export default function Skills() {


  return (
    <div className="skills-container"  id="skills">

      {/* العنوان */}
      <div className="skills-header ">
        <h1 className="skills-title ">
          المهارات
          <i className="fa-solid fa-gear fa-spin"></i>
        </h1>
      </div>



      {/* الكروت */}
      <div className="skills-cards">
        {/* Programming Languages */}
        <div className="skill-card  border-green">
          <h2 className="card-title">
            <i className="fa-solid fa-code"></i>
            لغات البرمجة
          </h2>
            <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
              </div>
            </li>
            </ul>
          {/* <ul className="card-list">
            <li>
              <span>C</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            <li>
              <span>C++</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            <li>
              <span>C#</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li>
            <li>
              <span>Python</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
          </ul> */}
        </div>

        {/* Tools */}
        <div className="skill-card border-green">
          <h2 className="card-title">
            <i className="fa-solid fa-screwdriver-wrench"></i>
            الأدوات
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
              </div>
            </li>
            {/* <li>
              <span>GitHub</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            <li>
              <span>VS Code</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
              </div>
            </li> */}
          </ul>
        </div>

        {/* DataBase */}
        <div className="skill-card border-purple">
          <h2 className="card-title">
            <i className="fa-solid fa-database"></i>
          قواعد بيانات
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            {/* <li>
              <span>Laravel</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li>
            <li>
              <span>Node</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
          </ul>
        </div>
        {/* BackEnd */}
        <div className="skill-card border-green">
          <h2 className="card-title">
            <i className="fa-solid fa-server"></i>
          تطوير الخلفية (Back-End)
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            {/* <li>
              <span>Laravel</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li>
            <li>
              <span>Node</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
          </ul>
        </div>
        {/* Front-End  */}
        <div className="skill-card  border-blue">
          <h2 className="card-title">
            <i className="fa-solid fa-laptop-code"></i>
         تطوير الواجهات (Front-End)
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            {/* <li>
              <span>Laravel</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li>
            <li>
              <span>Node</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
          </ul>
        </div>
        {/* Version Control */}
        <div className="skill-card border-green">
          <h2 className="card-title">
            <i className="fa-solid fa-code-branch"></i>
          Version Control
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            {/* <li>
              <span>Laravel</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
            {/* <li>
              <span>Node</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
          </ul>
        </div>


{/* Opreating System */}
          <div className="skill-card border-purple">
          <h2 className="card-title">
            <i className="fa-solid fa-terminal"></i>
          Operating Systems
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            {/* <li>
              <span>Laravel</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li>
            <li>
              <span>Node</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
          </ul>
        </div>



{/* أدوات التطوير (Tools) */}
          <div className="skill-card border-purple">
          <h2 className="card-title">
            <i className="fa-solid fa-tools"></i>
          أدوات التطوير (Tools)
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            {/* <li>
              <span>Laravel</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
            {/* <li>
              <span>Node</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
          </ul>
        </div>



{/* DevOps */}
          <div className="skill-card border-purple">
          <h2 className="card-title">
            <i className="fas fa-cloud-upload-alt"></i>
         DevOps
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            {/* <li>
              <span>Laravel</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
            {/* <li>
              <span>Node</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
          </ul>
        </div>



{/* Additional Skills */}
          <div className="skill-card border-purple">
          <h2 className="card-title">
            <i className="fas fa-lightbulb"></i>
        Additional Skills
          </h2>
          <ul className="card-list">
            <li>
              <span>---</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
              </div>
            </li>
            {/* <li>
              <span>Laravel</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
            {/* <li>
              <span>Node</span>
              <div className="skill-dots">
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </li> */}
          </ul> 
        </div>

      </div>
    </div>
  
  );
}
