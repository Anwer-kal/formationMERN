import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

function NewHome() {
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // Fonction de déconnexion
  const handleLogout = () => {
    // Supprimer les éléments d'authentification de localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");

    // Rediriger vers la page de connexion
    navigate("/login");
  };

  const [gratue] = useState([
    {
      title: "Introduction à l'Intelligence Artificielle",
      description: "Apprenez les bases de l'IA et du machine learning avec Python.",
      formateur: "ali belhaj ",
      date: "5 Avril 2025",
      heure: "16:00",
      mode: "En ligne",
    },
    {
      title: "Introduction au développement d'applications mobiles avec Flutter",
      description:
        "Découvrez comment créer des applications mobiles pour Android et iOS en utilisant le framework Flutter.",
      formateur: "yahya ben ali ",
      date: "20 Mars 2025",
      heure: "10:00",
      mode: "En ligne",
    },
  ]);

  const pageStyle = {
    fontFamily: "Roboto, sans-serif",
    backgroundColor: "#e9ecef",
    margin: "0",
    padding: "0",
    color: "#343a40",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "3em",
    color: "#495057",
    margin: "30px 0",
    fontWeight: "600",
  };

  const introStyle = {
    textAlign: "center",
    fontSize: "1.1em",
    color: "#6c757d",
    marginBottom: "30px",
  };

  const sectionStyle = {
    padding: "20px",
  };

  const titleStyle = {
    color: "#495057",
    fontSize: "2.2em",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "600",
  };

  const listStyle = {
    listStyleType: "none",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
  };

  const listItemStyle = {
    backgroundColor: "#ffffff",
    margin: "10px 0",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "80%",
    transition: "transform 0.3s ease-in-out",
  };

  const listItemHoverStyle = {
    transform: "scale(1.05)",
  };

  const buttonStyle = {
    borderRadius: "25px",
    padding: "12px 24px",
    fontSize: "1.1em",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  };

  const primaryButtonStyle = {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
  };

  const primaryButtonHoverStyle = {
    backgroundColor: "#218838",
  };

  const defaultButtonStyle = {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
  };

  const defaultButtonHoverStyle = {
    backgroundColor: "#c82333",
  };

  return (
    <div style={pageStyle}>
      <h1 style={headerStyle}>Bienvenue au Club Informatique</h1>
      <div style={introStyle}>
        <p>
          Un club informatique est un espace d’échange et d’apprentissage où
          les passionnés de technologie développent leurs compétences en
          programmation. <br />
          <strong>Rejoignez-nous pour participer à des projets et élargir votre réseau.</strong>
        </p>
      </div>
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Formations Gratue</h2>
        <ul style={listStyle}>
          {gratue.map((formation, index) => (
            <li
              key={index}
              style={listItemStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <strong>{formation.title}</strong>
              <p>{formation.description}</p>
              <p>{formation.formateur}</p>
              <p>📅 {formation.date} | 🕒 {formation.heure}</p>
              <p>📍 {formation.mode}</p>
            </li>
          ))}
        </ul>
      </div>

      {!isAuthenticated ? (
        <div>
          <p style={{ textAlign: "center", fontSize: "1.2em", color: "#6c757d" }}>
            Vous n'êtes pas connecté. Veuillez vous connecter pour accéder aux fonctionnalités protégées.
          </p>
          <Link to="/login">
            <Button
              type="primary"
              style={{
                ...buttonStyle,
                ...primaryButtonStyle,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
            >
              Se connecter
            </Button>
          </Link>
        </div>
      ) : (
        <div>
          <p style={{ textAlign: "center", fontSize: "1.2em", color: "#28a745" }}>
            Vous êtes connecté !
          </p>
          <Link to="/gestion-profile">
            <Button
              type="primary"
              style={{
                ...buttonStyle,
                ...primaryButtonStyle,
                marginBottom: "20px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
            >
              Accéder à Formations Payantes
            </Button>
          </Link>
          <br />
          <Button
            type="default"
            onClick={handleLogout}
            style={{
              ...buttonStyle,
              ...defaultButtonStyle,
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
          >
            Se déconnecter
          </Button>
        </div>
      )}
    </div>
  );
}

export default NewHome;
