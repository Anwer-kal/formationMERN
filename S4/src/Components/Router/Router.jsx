import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function Home() {
  return <h1>Accueil MERN</h1>;
}

function About() {
  return <h1>À propos MERN</h1>;
}

function Contact() {
    return <h1>Contact me</h1>;
  }

function Exemple1() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

      </Routes>
    </Router>
  );
}

export default Exemple1;
