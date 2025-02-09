import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router

function DetaisUn() {
  const [detais, setDetais] = useState([]);
  
  // This will allow us to grab the dynamic `id` from the URL if using React Router
  const { id } = useParams(); 

  useEffect(() => {
    setDetais([
      { 
        postion: "0",
        image :"/asstes/id0.jpg" ,
        title: "React Avancé", 
        description: "Maîtrisez React avec Redux et Hooks.", 
        formateur: "Ali Ben Mohamed",
        price: "40 D", 
        date: "10 Février 2025", 
        heure: "14:00", 
        mode: "En ligne"
      },
      { 
        postion: "1",
        image :"/asstes/id1.jpg" ,
        title: "Développement Mobile", 
        description: "Créez des applications avec React Native.", 
        formateur: "Mohmed Ben Othem",
        price: "50 D", 
        date: "15 Mars 2025", 
        heure: "10:00", 
        mode: "Sur place"
      },
      {
        postion: "2",
        image :"/asstes/id2.jpg" ,
        title: "Développement Web",
        description: "Créez des applications avec JavaScript, CSS, et HTML.",
        formateur: "Khalil Grassa",
        price: "36 D",
        date: "25 Mai 2025",
        heure: "12:00",
        mode: "En ligne"
      }
    ]);
  }, []);

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
    fontSize: "30px",
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
    fontSize: "20px",
    color: "#555"
  };

  return (
    <div style={containerStyle}>
      
      <ul style={listStyle}>
        
        {detais
          .filter((formation) => formation.postion === id) // Filter by ID (postion)
          .map((formation, index) => (
            <li key={index} style={itemStyle}>
              <p style={{titleStyle}}>
              <strong >{formation.title}</strong></p>
              <img src={formation.image} style={{borderRadius:"1000px", marginLeft:"30px"}}/>
              <p>{formation.description}</p>
              
              <p style={{ color: "red" }}>{formation.formateur}</p>
              <p style={priceStyle}>{formation.price}</p>
              <p style={dateStyle}>📅 {formation.date} | 🕒 {formation.heure}</p>
              <p>📍 {formation.mode}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DetaisUn;