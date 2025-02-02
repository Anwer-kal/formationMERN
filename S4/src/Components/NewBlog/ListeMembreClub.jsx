import { useState } from "react";

function ListeMembreClub() {
  const [roles] = useState([
    { name: "Hazem", role: "Président", description: "Dirige le club et prend les décisions." },
    { name: "Malek", role: "Secrétaire", description: "Gère l'administration et rédige les comptes rendus." },
    { name: "Ali", role: "Responsable Communication", description: "Gère la promotion et les réseaux sociaux." },
    { name: "Haifa", role: "Responsable Événements", description: "Organise les événements et ateliers." },
    { name: "Imen", role: "Membre Actif", description: "Participe aux projets et aux événements." }
  ]);

  // Styles modernisés
  const containerStyle = {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #6e8efb, #a777e3)",
    borderRadius: "15px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    color: "white",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px"
  };

  const listStyle = {
    listStyle: "none",
    padding: 0
  };

  const itemStyle = {
    background: "white",
    color: "#333",
    margin: "10px 0",
    padding: "15px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer"
  };

  const itemHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)"
  };

  const nameStyle = {
    color: "#6e8efb",
    fontWeight: "bold",
    fontSize: "18px"
  };

  const roleStyle = {
    fontWeight: "bold",
    margin: "5px 0"
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Rôles dans un Club Informatique</h2>
      <ul style={listStyle}>
        {roles.map((item, index) => (
          <li key={index}
              style={itemStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, itemHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, itemStyle)}
          >
            <span style={nameStyle}>{item.name}</span>
            <span style={roleStyle}>{item.role}</span>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListeMembreClub;

