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
      <nav>    {/*  (2 balise) kiif el a href  */}  {/*  bch yodhohrou f roots lkoll !!! */}
        <Link to="/">Accueil  | </Link>
        <Link to="/about">À propos</Link>
      </nav>
      <Routes> {/*  (1 balise) chnw elli f wost.ha  */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default LinkExemple;
