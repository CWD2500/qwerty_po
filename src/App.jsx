import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Components/Header/header.css'
import  Header from "./Components/Header/Header"
import  Footer from "./Components/Footer/Footer"
import  Home from "./WebPage/Home"
import  Skills from "./WebPage/Skills"
import Projects from './WebPage/Projects'
import AboutMy from './WebPage/AboutMy'
import Contact from './WebPage/Contact'
import { ToastContainer } from 'react-toastify';
import BackToTop from './components/BackToTop';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>

<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={true}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  toastStyle={{
    background: 'linear-gradient(135deg, #1e3a8a, #3730a3)',
    color: 'white',
    border: '1px solid #4f46e5',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(30, 58, 138, 0.3)'
  }}
  progressStyle={{
    background: 'linear-gradient(135deg, #60a5fa, #3b82f6)'
  }}
/>
    <Header/>
    <Home />
    <Skills />
    <Projects />
    <AboutMy />
    <Contact />
    <Footer />
    <BackToTop />
    </>
  )
}

export default App
