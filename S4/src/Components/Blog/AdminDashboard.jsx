import React from "react";
import { Timeline, Card, Row, Col,Calendar,Badge } from "antd";

const AdminDashboard = () => {
  const diplomes = [
    { title: "Licence en IoT", year: "2024", institution: "ISITCOM Hammam Sousse" },
    { title: "Diplôme en gâteaux 3D", year: "2024", institution: "Académie de Sousse" },
    { title: "Master de recherche en IA et Data Science", year: "2025", institution: "ISITCOM Hammam Sousse" },
    { title: "Formation Full Stack JS", year: "2025", institution: "Data Do It" }
  ];

  const foods = [
    {
      title: "Couscous tunisien",
      image: "/Cous.png",
      video: "https://www.bing.com/videos/riverview/relatedvideo?&q=couscous+tunisien&&mid=1DADD0905018AF0E993C1DADD0905018AF0E993C&&FORM=VRDGAR",
      time: "2h",
      difficulty: "Expert",
      ingredients: ["Semoule de blé", "Légumes", "Viande", "Épices","huile d’olive"],
      steps: ["Préparer la semoule ", "Faire la sauce ", "Cuire les légumes", "Cuire la semoule une deuxième fois","Assembler"],
    },
    {
      title: "Tajine Tunisien",
      image: "/taj.png",
      video: "https://www.bing.com/videos/riverview/relatedvideo?&q=Tajine+Tunisien&&mid=71353AB5F1C7E314292F71353AB5F1C7E314292F&&FORM=VRDGAR",
      time: "1h",
      difficulty: "Facile",
      ingredients: ["Oeufs", "Viande hachée", "Fromage", "Persil"],
      steps: ["Faire revenir la viande", "Mélanger les œufs et le fromage", "Cuire au four"],
    },
  ];
  const recette = [
    { title: "Couscous tunisien", date: "2025-02-10" },
    { title: "Tajine Tunisien", date: "2025-02-15" },
  ];

  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const events = recette.filter(event => event.date === formattedDate);

    return (
      <ul style={{ padding: 0, margin: 0 }}>
        {events.map((event, index) => (
          <li key={index} style={{ listStyle: "none" }}>
            <Badge status="processing" text={event.title} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Card style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center", fontSize: "24px" }}>
        <h2 style={{ color: "#3498db", fontFamily: "cursive", fontSize: "25px", paddingBottom: "10px" }}>Mon Parcours Académique</h2>
        <Timeline>
          {diplomes.map((diplome, index) => (
            <Timeline.Item key={index} color="green">
              <p style={{ color: "#2c3e50", fontFamily: "cursive", fontSize: "16px" }}>
                {diplome.title} - {diplome.year} - {diplome.institution}
              </p>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      <Card style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
        <h2 style={{ color: "#3498db", fontFamily: "cursive", fontSize: "25px", paddingBottom: "10px" }}>Mes Recettes</h2>
        {foods.map((food, index) => (
          <Card key={index} style={{ marginBottom: "15px", padding: "10px" }}>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <h3 style={{ color: "#2980b9", fontFamily: "cursive" ,fontSize:"22px" ,marginLeft:"200px"}}>{food.title}</h3>
                
                <img src={food.image} alt={food.title} style={{ width: "100%", borderRadius: "8px", marginTop: "10px",height:"350px" }} />
                <a href={food.video} style={{ textAlign:"center",paddingLeft:"220px"}}>Voir la vidéo</a>
                <p style={{fontFamily: "cursive" ,fontSize:"18px" ,marginLeft:"50px"}}><strong>Temps de préparation:</strong> {food.time}</p>
                <p style={{fontFamily: "cursive" ,fontSize:"18px" ,marginLeft:"50px"}}><strong>Difficulté:</strong> {food.difficulty}</p>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <p style={{ color: "black", fontFamily: "cursive" ,fontSize:"20px" ,marginLeft:"40px",textAlign:"center" ,paddingTop:"60px"}}><strong>Ingrédients:</strong></p>
                <ul style={{ textAlign:"center",paddingLeft:"100px", marginLeft:"30px"}} >
                  {food.ingredients.map((ingredients, idx) => (
                    <li key={idx}>{ingredients}</li>
                  ))}
                </ul>
                <p style={{ color: "black", fontFamily: "cursive" ,fontSize:"20px" ,marginLeft:"40px",textAlign:"center" ,paddingTop:"60px"}}><strong>Étapes:</strong></p>
                <ol style={{ textAlign:"center",paddingLeft:"100px", marginLeft:"30px"}}>
                  {food.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </Col>
            </Row>
          </Card>
        ))}
      </Card>
      <Card style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
        <h2 style={{ color: "#3498db", fontFamily: "cursive", fontSize: "25px", paddingBottom: "10px" }}>Mon Calendrier</h2>
        <Calendar style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px" }} dateCellRender={dateCellRender} />
      </Card>
    </div>
  );
};

export default AdminDashboard;
