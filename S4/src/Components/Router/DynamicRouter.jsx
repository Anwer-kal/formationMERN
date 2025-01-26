import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

// Composant pour la page d'accueil
function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger la liste des utilisateurs depuis l'API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <h1>Chargement...</h1>;
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Composant pour la page de profil utilisateur
function UserProfile() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger les détails de l'utilisateur depuis l'API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error("Utilisateur introuvable");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <h1>Chargement...</h1>;
  }

  if (!user) {
    return <h1>Erreur : Utilisateur introuvable</h1>;
  }

  return (
    <div>
      <h1>Profil de {user.name}</h1>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Adresse :</strong> {user.address.street}, {user.address.city}</p>
      <p><strong>Entreprise :</strong> {user.company.name}</p>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

// Application principale
function UsersList() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default UsersList;
