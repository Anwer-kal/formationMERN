import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
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
      navigate("/protected");
    } else {
      message.error("Nom d'utilisateur ou mot de passe incorrect !");
    }
  };

  return (
    <div>
      <h1>Page de Connexion</h1>
      <Form
        name="login"
        layout="vertical"
        onFinish={handleLogin}
        style={{ maxWidth: 300, margin: "0 auto" }}
      >
        <Form.Item
          label="Nom d'utilisateur"
          name="username"
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
          rules={[{ required: true, message: "Veuillez entrer votre mot de passe" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez le mot de passe"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Se connecter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
