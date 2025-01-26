import React from 'react'; 
import Nav from './components/Nav';
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects"; 
import Skills from "./components/Skills"; 
import Contact from "./components/Contact"; 
import Footer from "./components/Footer"; 
import './styles.css';

function App() {
  let Items = [
    {id: 1, title: "About"},
    {id: 2, title: "Projects"},
    {id: 3, title: "Experience"},
    {id: 4, title: "Skills"},
    {id: 5, title: "Contact"},
    {id: 6, title: "Position"},
  ];

  let experiences = [
    {
      imgSrc: "https://upload.wikimedia.org/wikipedia/commons/0/05/Leoni.svg",  
      companyName: "LEONI Group sousse",
      date:"2024",
      role: "IT Development Intern",
      description: "Develop and test features according to defined needs.",
    },
    {
      imgSrc: "https://www.obg.tn/web/image/662476-27f881f8/Logo-Obg-.png",  
      companyName: "Optimal business growth",
      role: "IT Development Intern",
      description: "A development intern helps create Odoo modules, integrate connected devices to collect data, and use artificial intelligence to automate or improve processes.",
    },
  ];

  const projects = [
    {
      title: "Project 1:Automation with UiPath Studio",
      description: "In this project, I created a simple automation process using UiPath Studio.",
    },
    {
      title: "Project 2:Agriculture Management with Odoo",
      description: "This project involved the development of three modules on Odoo specifically designed for agriculture management. In addition, an AI and IoT part was integrated to improve the efficiency of agricultural processes.",
    }
  ];

  const skills = [
    { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/5/50/Odoo_logo.svg", name: "Odoo" },
    { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg", name: "Node.js" },
    { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", name: "Python" },
    { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png", name: "JavaScript" },
    { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg", name: "HTML" },
    { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg", name: "CSS" }
  ];

  return (
    <div>
      <Nav item={Items} />
      <Hero title="Hello, I am Essra Jegham" subtitle="Welcome to my portfolio website" />
      <About 
        imgSrc="http://hotprintdesign.com/wp-content/uploads/2019/02/no-profile-photo.jpg"
        description="I am a Master's student in Research in Artificial Intelligence and Data Analysis."
      />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Skills skills={skills} /> 
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
