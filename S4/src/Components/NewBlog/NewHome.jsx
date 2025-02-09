import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./NewHome.css";

function NewHome() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const [gratuit] = useState([
    {
      title: "Introduction à l'Intelligence Artificielle",
      image :"/asstes/ia.jpg" ,
      description: "Apprenez les bases de l'IA et du machine learning avec Python.",
      formateur: "Ali Belhaj",
      date: "5 Avril 2025",
      heure: "16:00",
      mode: "En ligne",
    },
    {
      title: "Introduction au développement d'applications mobiles avec Flutter",
      image :"/asstes/flu.jpg" ,
      description: "Découvrez comment créer des applications mobiles pour Android et iOS en utilisant le framework Flutter.",
      formateur: "Yahya Ben Ali",
      date: "20 Mars 2025",
      heure: "10:00",
      mode: "En ligne",
    },
  ]);

  return (
    <div className="container">
    <h1 className="header">Bienvenue au Club Informatique</h1>
    <p className="intro">
      Un club informatique est un espace d’échange et d’apprentissage où les passionnés de technologie développent leurs compétences en programmation.
      <br />
      <strong>Rejoignez-nous pour participer à des projets et élargir votre réseau.</strong>
    </p>
    <div className="section">
      <h2 className="title">Formations Gratuites</h2>
      <ul className="list">
        {gratuit.map((formation, index) => (
          <li key={index} className="list-item">
            <strong>{formation.title}</strong>
            <img src={formation.image} style={{borderRadius:"1000px", marginLeft:"30px"}}/>
            <p>{formation.description}</p>
            <p>{formation.formateur}</p>
            <p>📅 {formation.date} | 🕒 {formation.heure}</p>
            <p>📍 {formation.mode}</p>
          </li>
        ))}
      </ul>
    </div>
  
    <div>
      {!isAuthenticated ? (
        <>
          <p>Vous n'êtes pas connecté. Veuillez vous connecter.</p>
          <Link to="/login" className="button button-primary">Se connecter</Link>
        </>
      ) : (
        <>
          <p className="text-green">Vous êtes connecté !</p>
          <Link to="/gestion-profile" className="button button-primary">Accéder aux Formations Payantes</Link>
          <br />
          <button onClick={handleLogout} className="button button-danger">Se déconnecter</button>
        </>
      )}
    </div>
  
    <div className="contact">
      <h3>Contact Personnel</h3>
      <p>📞 +216 99 123 456</p>
      <p>📧 contact@clubinfo.com</p>
    </div>
  </div>
  
  );
}

export default NewHome;

