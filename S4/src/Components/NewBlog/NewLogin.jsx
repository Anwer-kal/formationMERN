import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Form, message } from "antd";

function NewLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Fonction de gestion de la soumission du formulaire
  const handleLogin = () => {
    // Vérification des identifiants
    if (username === "root" && password === "root") {
      // Sauvegarder l'état d'authentification dans localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", "admin"); // ou "user" selon les besoins

      message.success("Connexion réussie !");
      // Rediriger vers la page d'accueil ou une page protégée
      navigate("/");
    } else {
      message.error("Nom d'utilisateur ou mot de passe incorrect !");
    }
  };

  // Style CSS en ligne
  const pageStyle = {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f9",
    padding: "50px 0",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const formContainerStyle = {
    backgroundColor: "#fff",
    padding: "30px 40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "2em",
    marginBottom: "20px",
    color: "#333",
  };

  const formItemStyle = {
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
    color: "#fff",
    fontSize: "1.1em",
    width: "100%",
    padding: "12px 0",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
    borderColor: "#45a049",
  };

  return (
    <div style={pageStyle}>
      <div style={formContainerStyle}>
        <h1 style={headingStyle}>Connexion</h1>
        <Form
          name="login"
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            label="Nom d'utilisateur"
            name="username"
            style={formItemStyle}
            rules={[{ required: true, message: "Veuillez entrer votre nom d'utilisateur" }]}
          >
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez le nom d'utilisateur"
            />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            style={formItemStyle}
            rules={[{ required: true, message: "Veuillez entrer votre mot de passe" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
            >
              Se connecter
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default NewLogin;
