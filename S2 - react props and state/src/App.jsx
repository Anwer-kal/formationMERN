import './App.css';
import  Component1  from './Component/Component1.jsx';
import  Component2  from './Component/Component2.jsx';
import  Propos1  from './Component/Propos1.jsx';
import  Propos2  from './Component/Propos2.jsx';
import  PropoType  from './Component/ComponentPropoType.jsx';



function App() {
  return (
    <div className="App">
     <Component1 />
     <Component2 />


     <Propos1  name="Salem" surName="Kalghoum"  email='anwer@gmail.com'/>
     <Propos1  name="ded" surName="Kalghoum"  email='anwer@gmail.com'/>
     <Propos1  name="ff" surName="Kalghoum"  email='anwer@gmail.com'/>
     <Propos1  name="gtg" surName="Kalghoum"  email='anwer@gmail.com'/>
     <Propos1  name="gthy" surName="Kalghoum"  email='anwer@gmail.com'/>

     <Propos2  name="dede" surName="Kalghoum"  email='anwer@gmail.com'/>
     <PropoType name='ali' age={"6fff"} phone={454545445}></PropoType>


    </div>
  );
}

export default App;
