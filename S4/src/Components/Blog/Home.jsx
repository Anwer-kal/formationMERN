import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated"));

  // Gérer la redirection après le rendu
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user/profile");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    navigate("/login"); // Aller vers la page de connexion
  };

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>

      {/* 🔹 Présentation IEEE ENET'Com */}
      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2>À propos d'IEEE ENET'Com</h2>
        <p>
          IEEE ENET'Com est une branche étudiante de l'<strong>Institute of Electrical and Electronics Engineers (IEEE)</strong> 
          à l'<strong>École Nationale d'Électronique et des Télécommunications de Sfax (ENET'Com)</strong>. 
          Notre mission est de promouvoir l'innovation technologique, l'apprentissage collaboratif et le développement 
          professionnel des étudiants à travers divers événements, formations et projets techniques.
        </p>
        <p>
          Rejoignez-nous pour bénéficier de ressources exclusives, participer à des compétitions et interagir avec des experts 
          de l'industrie !
        </p>
        <a href="https://enetcom.ieee.tn/" target="_blank" rel="noopener noreferrer">
          <Button type="primary">En savoir plus</Button>
        </a>
      </div>

      {/* 🔹 Si l'utilisateur n'est pas connecté, afficher le bouton de connexion */}
      {!isAuthenticated && (
        <div>
          <p>Vous n'êtes pas connecté. Veuillez vous connecter pour accéder aux fonctionnalités protégées.</p>
          <Button type="primary" onClick={handleLogin}>Se connecter</Button>
        </div>
      )}

      {/* 🔹 Si l'utilisateur est connecté, afficher le contenu exclusif */}
      {isAuthenticated && (
        <div style={{ marginTop: "40px" }}>
          <h3>Contenu exclusif</h3>

          <div>
            <h4>IEEE ENET'Com sur Facebook</h4>
            <a href="https://www.facebook.com/IEEEENETCOMSB" target="_blank" rel="noopener noreferrer">
              <img
                src="https://scontent.ftun1-2.fna.fbcdn.net/v/t39.30808-6/471299651_10045221032160466_6630004643879747969_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=ozr2N9Bp7jcQ7kNvgFhthWd&_nc_zt=23&_nc_ht=scontent.ftun1-2.fna&_nc_gid=AXz8M5LMECsjwLM1U9B9xAW&oh=00_AYAaheaAKZ6NRSki63U4R2gzeqnDsgbR028QzpxlZzv9jg&oe=67A080C7"
                alt="IEEE ENET'Com Facebook"
                style={{ width: "100%", maxWidth: "600px", borderRadius: "10px" }}
              />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
