import './App.css';
import Nav from './components/Nav.jsx';
import HeroSection from './components/HeroSection.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  // Define skillsData here
  const skillsData = [
    { src_img: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg', name: 'React' },
    { src_img: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg', name: 'Node.js' },
    { src_img: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg', name: 'Angular' },
    { src_img: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png', name: 'JavaScript' },
    { src_img: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg', name: 'HTML' },
    { src_img: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg', name: 'CSS' },
  ];

  return (
    <div className="App">
      <header>
        <Nav />
        <HeroSection name="Makrem Mhiri" />
      </header>
      <About pro="developper" inter="AI" />
      <Experience 
        title="DataDoit" 
        img="../assets/datadoit.jpg" 
        Role="Software Developer" 
        Desc="Worked on developing innovative software solutions for small businesses." 
      />
      <Experience 
        title="Samsung" 
        img="../assets/images.png" 
        Role="Software Developer" 
        Desc="Worked on developing innovative software solutions for small businesses." 
      />
      <Projects />
      {/* Pass skillsData to Skills component */}
      <Skills skillsData={skillsData} />
      <Contact name="makremmhiri290" mail="gmail"/>
      <Footer name="Makrem Mhiri"/>
    </div>
  );
}

export default App;
