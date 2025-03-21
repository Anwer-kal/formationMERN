import './App.css';
import Nav from './Component/Navbar/Navbar.jsx'
import Hero from './Component/Hero/Hero.jsx'
import About from './Component/About/About.jsx'


import picture1 from './picture/logo.png'

function App() {
  let item = [
    {id: 1, title:"About"},
    {id: 2, title:"Projects"},
    {id: 3, title:"Experience"},
    {id: 4, title:"Skills"},
    {id: 5, title:"Contact"},
  ]
  return (

    <div className="App">
       <Nav item={item}/>
       <Hero name='Anwer kalghoum' description={'Welcome to my portfolio website'} />
       <About picture={picture1} description="I am a fullstack with a passion for react , nodejs" ></About>
    </div>
  );
}

export default App;
