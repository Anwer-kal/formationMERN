import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import NewHome from "./NewHome";
import ListeMembreClub from "./ListeMembreClub";
import FormationsPayantes from "./FormationsPayantes";
import NewLogin from "./NewLogin";
import DetaisUn from "./DetaisUn";
import Contact from "./Contact";
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
    window.location.href = "/login";  // Redirection vers la page de connexion après déconnexion
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
            <Menu.Item key="liste">
              <Link to="membre"> Liste de memebre</Link>
            </Menu.Item>
            <Menu.Item key="cont">
              <Link to="contact"> Contact me </Link>
            </Menu.Item>
           
            {/*Bouton de déconnexion*/} 
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
              <Route path="/" element={<NewHome />} />
              {/* Routes du bloc Admin avec protection */}
              <Route
                path="/membre"
                element={<ListeMembreClub /> }/>
              <Route path="/gestion-profile" element={<FormationsPayantes/>}/>
            
              <Route path="/login" element={< NewLogin/>} />
             <Route path="/detais/:id" element={<DetaisUn/>}/>
             <Route path="/contact" element={<Contact/>}/>
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
