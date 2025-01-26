import './App.css';
import './index.css';

import Header from './Component/Component-header/Component-header';
import About from './Component/Component-section-about/Component-section-about';
import Experience from './Component/Component-section-experience/Component-section-experience';


function App() {
  return (
    <div>
      <Header />
      <section>
      <About />
      </section>
      <section>
      <Experience    title="My Experience" image="../assets/leo.jpg" company="LEONI Group Sousse"  role="IT Development Intern" description="Develop and test features according to defined needs."/>
      <Experience   image="../../assets/OBG.png" company="Optimal business growth"  role="IT Development Intern" description="Description :Une stagiaire en développement contribue à la création de modules Odoo, à l’intégration de dispositifs connectés pour collecter des données et à l’utilisation de l’intelligence artificielle pour automatiser ou améliorer des processus."/>

      </section>
    </div>
    
  );
}

export default App;
