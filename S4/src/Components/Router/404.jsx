import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Home() {
  return <h1>Accueil</h1>;
}

function NotFound() {
  return <h1>Erreur 404 : Page non trouvée</h1>;
}

function notFound() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} /> {/* Route fallback */}
      </Routes>
    </Router>
  );
}

export default notFound;
