import { useState } from "react";

function FormationsPayantes() {
  const [formations] = useState([
    { 
      title: "React Avancé", 
      description: "Maîtrisez React avec Redux et Hooks.", 
      formateur:"ali ben mohamed",
      price: "40 D", 
      date: "10 Février 2025", 
      heure: "14:00", 
      mode: "En ligne"
    },
    { 
      title: "Développement Mobile", 
      description: "Créez des applications avec React Native.", 
      formateur:"mohmed ben othem",
      price: "50D", 
      date: "15 Mars 2025", 
      heure: "10:00", 
      mode: "Sur place"
    },
    {
      title:"Developpement web",
      description:"Créez application avec javascripte , css et html",
      formateur:"khalil grassa",
      price:"36D",
      date:"25 mai 2025",
      heure:"12:00",
      mode:"En ligne"

    }
  ]);

  const containerStyle = {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#FFE4E1",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(241, 72, 72, 0.2)",
    textAlign: "center"
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333"
  };

  const listStyle = {
    listStyle: "none",
    padding: 0
  };

  const itemStyle = {
    background: "#f4f4f4",
    margin: "10px 0",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)"
  };

  const priceStyle = {
    color: "green",
    fontWeight: "bold"
  };

  const dateStyle = {
    fontSize: "14px",
    color: "#555"
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Formations Payantes</h2>
      <ul style={listStyle}>
        {formations.map((formation, index) => (
          <li key={index} style={itemStyle}>
            <strong>{formation.title}</strong>
            <p>{formation.description}</p>
            <p style={{color:"red"}}>{formation.formateur}</p>
            <p style={priceStyle}>{formation.price}</p>
            <p style={dateStyle}>📅 {formation.date} | 🕒 {formation.heure}</p>
            <p>📍 {formation.mode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FormationsPayantes;
