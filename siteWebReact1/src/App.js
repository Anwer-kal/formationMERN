import './App.css';
import Nav from './Component/Navbar/Navbar.jsx'
import Hero from './Component/Hero/Hero.jsx'

function App() {
  let item = [
    {id: 1, title:"About"},
    {id: 2, title:"Projects"},
    {id: 3, title:"Experience"},
    {id: 4, title:"Skills"},
    {id: 5, title:"Contact"},
    {id: 6, title:"Position"},
  ]
  return (

    <div className="App">
       <Nav item={item}/>
       <Hero name='Anwer kalghoum' description={'Welcome to my portfolio website'} />
    </div>
  );
}

export default App;
