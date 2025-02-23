import React, { useEffect } from 'react';

function Component1() {
  useEffect(() => {
    console.log('Composant monté');
  }, []); // Tableau vide : l'effet ne s'exécute qu'une seule fois

  return <div>Composant avec un useEffect simple</div>;
}

export default Component1;