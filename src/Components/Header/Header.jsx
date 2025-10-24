import { useState } from "react";
import chatbox from "../../assets/icon/chatbox.png";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
   <nav className="bg-[#0A162D] shadow-md w-full flex flex-col md:flex-row">
  <div className="max-w-7xl mx-auto w-full px-4 py-3 flex justify-between items-center">
    <h1 className="text-logo">محمد سليمان</h1>
    <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
      {open ? "×" : "☰"}
    </button>

    <ul className="hidden md:flex gap-6 items-center">
      <li><a href="#skills" className="text-links">المهارات</a></li>
      <li><a href="#projects" className="text-links">المشاريع</a></li>
      <li><a href="#about" className="text-links">عنّي</a></li>
      <li>
        <a href="#contact" className="text-links-button flex items-center gap-2">
          تواصل معنا <img src={chatbox} />
        </a>
      </li>
    </ul>
  </div>

  {open && (
    <ul className="flex flex-col w-full gap-2 px-4 pb-4 md:hidden">
      <li><a href="#skills" className="text-links block w-full text-center">المهارات</a></li>
      <li><a href="#projects" className="text-links block w-full text-center">المشاريع</a></li>
      <li><a href="#about" className="text-links block w-full text-center">عنّي</a></li>
      <li>
        <a href="#contact" className="text-links-button flex justify-center w-full">
          تواصل معنا <img src={chatbox} />
        </a>
      </li>
    </ul>
  )}
</nav>

  );
}
