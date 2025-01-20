import './App.css';
import react from 'react';
import  Component1 from './component/Component1.jsx';
import Component2  from './component/Component2.jsx';
import  Props1 from './component/Props1.jsx';
function App() {
  return (
    <div className="App">
      <Component1 name="aa" surName="bb" email="cc"/>
      <Component2 name="AA" surName="BB" email="CC"/>
      <Props1 name='makrem' age="aa"/>
    </div>
  );
}

export default App;
