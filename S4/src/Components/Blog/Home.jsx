import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

function Home() {
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

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      {!isAuthenticated ? (
        <div>
          <p>Vous n'êtes pas connecté. Veuillez vous connecter pour accéder aux fonctionnalités protégées.</p>
          <Link to="/login">
            <Button type="primary">Se connecter</Button>
          </Link>
        </div>
      ) : (
        <div>
          <p>Vous êtes connecté !</p>
          <Link to="/user/profile">
            <Button type="primary">Accéder à votre profil</Button>
          </Link>
          <br />
          <Button type="default" onClick={handleLogout} style={{ marginTop: 20 }}>
            Se déconnecter
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
