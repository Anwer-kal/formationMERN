import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import Home from "./Home";
import Login from "./Login";
import UserProfile from "./UserProfile";
import AdminDashboard from "./AdminDashboard";
import AdminSettings from "./AdminSettings";
import Unauthorized from "./Unauthorized";
import Details from "./Details";
const { Header, Content, Footer, Sider } = Layout;

// Composant pour les routes protégées
function ProtectedRoute({ children, isAdminRequired = false }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isAdmin = localStorage.getItem("role") === "admin";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdminRequired && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Composant principal avec navigation et déconnexion
function Bloc() {
  const [current, setCurrent] = useState("home");

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    // window.location.href = "/login";  // Redirection vers la page de connexion après déconnexion
    <Navigate to="/login" />
  };

  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar avec navigation */}
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            selectedKeys={[current]}
            onClick={handleMenuClick}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="home">
              <Link to="/">Accueil</Link>
            </Menu.Item>
            <Menu.Item key="userProfile">
              <Link to="/user/profile">Profil Utilisateur</Link>
            </Menu.Item>
            {/* <Menu.Item key="adminDashboard">
              <Link to="/admin/dashboard">Tableau de bord Administrateur</Link>
            </Menu.Item> */}
            <Menu.Item key="adminSettings">
              <Link to="/admin/settings">Paramètres Administrateur</Link>
            </Menu.Item> 

            {/* Bouton de déconnexion */}
            {isAuthenticated && (
              <Menu.Item key="logout" style={{ position: "absolute", bottom: 20, width: "100%" }}>
                <Button type="default" onClick={handleLogout} block>
                  Se déconnecter
                </Button>
              </Menu.Item>
            )}
          </Menu>
        </Sider>

        {/* Contenu principal */}
        <Layout style={{ padding: "0 24px 24px" }}>
          <Header style={{ padding: 0 }} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Routes du bloc Utilisateur */}
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/profile/:clubName/details" element={<Details />} />
              {/* Routes du bloc Admin avec protection */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute isAdminRequired={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute isAdminRequired={true}>
                    <AdminSettings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings/:clubName/details"
                element={
                  <ProtectedRoute isAdminRequired={true}>
                    <Details />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Application React avec Ant Design ©2025
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default Bloc;
