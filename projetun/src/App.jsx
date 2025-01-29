import logo from './logo.svg';
//import './App.css';


import About from './component/About/About';
import Contact from './component/Contact/Contact';
import Experience from './component/Experience/Experience';
import Footer from './component/Footer/Footer';
import Navbar from './component/Navbar/Navbar';
import Skills from './component/skills/Skills';
import Projects from './component/projects/Projects';

function App() {
  let item=[
    {id:1, title :"About"},
    {id:2, title :"Projects"},
    {id:3, title :"Experience"},
    {id:4, title :"Skills"},
    {id:5, title :"Contact"},
    

  ]
  return (
    <div className='app'>
        <Navbar name="kharbech malek" />
      <About/>
      <Contact/>
      <Experience/>
     
    
      <Projects/>
      <Skills/>
  <Footer/>


    </div>
  );
}

export default App;
