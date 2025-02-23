import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <h1>Accueil Hello Mern </h1>;
}

function About() {
  return <h1>À propos Mern</h1>;
}

function LinkExemple() {
  return (
    <Router>
      <nav>
        <Link to="/">Accueil  | </Link>
        <Link to="/about">À propos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default LinkExemple;
