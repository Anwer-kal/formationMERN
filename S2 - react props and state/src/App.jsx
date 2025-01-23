import './App.css';
import  Component1  from './Component/Component1.jsx';
import  Component2  from './Component/Component2.jsx';
import  Propos1  from './Component/Propos1.jsx';
import  Propos2  from './Component/Propos2.jsx';
import  PropoType  from './Component/ComponentPropoType.jsx';
import  Compo from './Component/Compo.jsx';


function App() {
  return (
    <div className="App">
     {/* <Component1 />
     <Component2 />

     <Propos1  name="Salem" surName="Kalghoum"  email='anwer@gmail.com'/>
     <Propos2  name="dede" surName="Kalghoum"  email='anwer@gmail.com'/>
     <PropoType name='ali' age={6} phone={454545445}/> */}
     <Compo name='makrem' age={21} phone={484848484} address="ccccc.fr" pays="tunis"/>
    </div>
  );
}

export default App;
