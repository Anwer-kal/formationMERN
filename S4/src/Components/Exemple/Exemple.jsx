import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Header, Content, Footer } = Layout;

// Simuler l'état d'authentification
const isAuthenticated = false; // Changez à `true` pour tester l'accès aux routes protégées

// Composant pour la route protégée
function ProtectedRoute({ children }) {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Composant pour la page d'accueil
function Home() {
  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>Ceci est une page publique.</p>
    </div>
  );
}

// Composant pour la page protégée 1
function Dashboard() {
  return (
    <div>
      <h1>Tableau de bord</h1>
      <p>Cette page est protégée. Vous devez être connecté pour y accéder.</p>
    </div>
  );
}

// Composant pour la page protégée 2
function Profile() {
  return (
    <div>
      <h1>Profil utilisateur</h1>
      <p>Informations personnelles de l'utilisateur connecté.</p>
    </div>
  );
}

// Composant pour la page de connexion
function Login() {
  return (
    <div>
      <h1>Connexion</h1>
      <p>Veuillez vous connecter pour accéder aux pages protégées.</p>
    </div>
  );
}

// Composant principal avec navigation
function Exemple() {
  const [current, setCurrent] = useState("home");

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Router>
      <Layout>
        {/* Barre de navigation */}
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[current]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="home">
              <Link to="/">Accueil</Link>
            </Menu.Item>
            <Menu.Item key="dashboard">
              <Link to="/dashboard">Tableau de bord</Link>
            </Menu.Item>
            <Menu.Item key="profile">
              <Link to="/profile">Profil</Link>
            </Menu.Item>
          </Menu>
        </Header>

        {/* Contenu */}
        <Content style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>

        {/* Pied de page */}
        <Footer style={{ textAlign: "center" }}>
          Application React avec Ant Design ©2025
        </Footer>
      </Layout>
    </Router>
  );
}

export default Exemple;
