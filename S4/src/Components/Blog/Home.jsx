import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Avatar, Row, Col, Statistic, Carousel, Collapse, Modal, Input } from "antd";
import { UserOutlined, SmileOutlined, HeartOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Panel } = Collapse;

function Home() {
  const [state1, setState1] = useState("");
  const [state2, setState2] = useState("");
  const [state3, setState3] = useState("");
  const [open, setOpen] = useState(false);  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageClick = (item) => {
    navigate(`/description/${item.id}`, { state: { item } });
  };

  const food = [
    { id: 1, title: "Pasta", image: "pasta.png", description: "Un classique italien aux saveurs crémeuses." },
    { id: 2, title: "Pizza Margherita", image: "pizza.png", description: "Une pizza simple avec des ingrédients frais." },
    { id: 3, title: "Tiramisu Maison", image: "tir.png", description: "Un dessert italien riche et savoureux." },
    { id: 4, title: "Pancake", image: "pan.png", description: "La crêpe est un gâteau plat, souvent servi avec du sirop ou des fruits." },
  ];

  const panel = [
    { header: "Pasta", content: "Un classique italien aux saveurs crémeuses" },
    { header: "Pancake", content: "La crêpe est un gâteau plat, souvent servi avec du sirop ou des fruits." }
  ];

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const showModal = () => {
    setOpen(true);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily: "cursive", color: "#2c3e50" }}>
        Bienvenue sur mon Blog de cuisine
      </h1>
      <Button type="primary" onClick={showModal} style={{ display: "block", margin: "20px auto" }}>
        Ouvrir le formulaire
      </Button>
      <Modal
        title="Formulaire de Contact"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <form>
      <label>Nom :</label>
      <Input placeholder="Votre nom" style={{ width: "100%", marginBottom: "10px" }} />

      <label>Email :</label>
      <Input type="email" placeholder="Votre email" style={{ width: "100%", marginBottom: "10px" }} />

      <label>Adresse :</label>
      <Input placeholder="Votre adresse" style={{ width: "100%", marginBottom: "10px" }} />

      <label>Numéro de téléphone :</label>
      <Input type="tel" placeholder="Votre numéro" style={{ width: "100%", marginBottom: "10px" }} />

      <label>Message :</label>
      <Input.TextArea placeholder="Votre message" style={{ width: "100%", marginBottom: "10px" }} rows={4} />

      <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px" }}>
        Envoyer
      </button>
    </form>
        )}
      </Modal>

      {!isAuthenticated ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ fontSize: "18px", color: "#e74c3c" }}>
            Vous n'êtes pas connecté. Veuillez vous connecter pour accéder aux fonctionnalités protégées.
          </p>
          <Button
            type="primary"
            size="large"
            style={{
              marginTop: "20px",
              backgroundColor: "#3498db",
              borderColor: "#3498db",
            }}
            onClick={() => navigate("/login")}
          >
            Se connecter
          </Button>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: "20px" }}>
            <Card
              hoverable
              style={{ width: 340, margin: "10px auto", textAlign: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", padding: "20px", borderRadius: "15px" }}
              cover={<img alt="Cuisine" src="cuisiner.png" style={{ height: "100px", width: "110px", textAlign: "center", margin: "0 auto" }} />}
            >
              <Meta description={<a href="https://www.instagram.com/essra_jegham/">Suivez-moi sur Instagram</a>} />
            </Card>

            <p style={{ fontFamily: "cursive", fontSize: "16px", color: "#34495e", lineHeight: "1.5" }}>
              Bienvenue sur mon blog culinaire, un espace où la passion de la cuisine rencontre l'amour de l'exploration des saveurs ! 
              Ici, vous trouverez des recettes variées, des astuces pratiques, et des conseils pour élever vos compétences culinaires.
              Que vous soyez un amateur ou un cuisinier expérimenté, ce blog est conçu pour vous inspirer à créer des plats délicieux et à découvrir de nouvelles idées dans le monde culinaire.
              Restez connecté pour de nouvelles recettes et idées à partager.
            </p>
          </div>

          <Card
            hoverable
            style={{ width: 1000, margin: "20px auto", textAlign: "center", height: "300px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "15px", padding: "20px" }}
          >
            <Avatar size={64} icon={<UserOutlined />} />
            <h2 style={{ color: "#3498db", fontFamily: "cursive" }}>Essra Jegham</h2>
            <p style={{ fontFamily: "cursive", fontSize: "14px", color: "#34495e" }}>
              Je suis une étudiante en informatique passionnée par la recherche scientifique, le développement et la programmation. 
              J’aime explorer de nouveaux concepts, relever des défis techniques et approfondir mes connaissances dans ces domaines en constante évolution. 
              En parallèle, la cuisine est une véritable source de créativité pour moi. J’adore expérimenter avec différentes saveurs, tester de nouvelles recettes et revisiter des plats classiques en y apportant ma touche personnelle.
            </p>
          </Card>

          <h1 style={{ color: "black", fontFamily: "cursive", textAlign: "center", marginTop: "30px" }}>Mes Recettes Préférées</h1>
          <Carousel autoplay effect="fade" style={{ marginBottom: "30px" }}>
            {food.map((item) => (
              <div key={item.id} onClick={() => handleImageClick(item)} style={{ cursor: "pointer" }} >
                <Card
                  hoverable
                  style={{ borderRadius: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "20px", textAlign: "center", padding: "20px" }}
                  cover={
                    <Link to={`/description/${item.id}`}>
                      <img alt={item.title} src={item.image} style={{ width: "100%", height: "400px", paddingTop: "30px", objectFit: "contain" }} />
                    </Link>
                  }
                >
                  <Meta
                    title={item.title}
                    description={item.description}
                    style={{ paddingTop: "1px", paddingBottom: "10px" }}
                  />
                  <div className="icons-list" style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                    <SmileOutlined style={{ fontSize: "24px", color: "#52c41a", marginRight: "10px" }} />
                    <HeartOutlined style={{ fontSize: "24px", color: "#eb2f96", marginRight: "10px" }} />
                    <CheckCircleOutlined style={{ fontSize: "24px", color: "#52c41a", marginRight: "10px" }} />
                  </div>
                </Card>
              </div>
            ))}
          </Carousel>

          <h1 style={{ color: "black", fontFamily: "cursive", textAlign: "center", marginTop: "30px" }}>Historiques des recettes</h1>
          <Collapse defaultActiveKey={["1"]} style={{ marginBottom: "30px" }}>
            {panel.map((panelItem, index) => (
              <Panel header={panelItem.header} key={index.toString()}>
                <p>{panelItem.content}</p>
              </Panel>
            ))}
          </Collapse>

          <h1 style={{ color: "black", fontFamily: "cursive", textAlign: "center", marginTop: "30px" }}>Mes Statistiques</h1>
          <Row gutter={[16, 16]} style={{ marginBottom: "30px" }}>
            <Col span={8}>
              <Statistic title="Recettes Préparées" value={40} prefix={<CheckCircleOutlined />} />
            </Col>
            <Col span={8}>
              <Statistic title="Temps Passé en Cuisine" value="3h" prefix={<ClockCircleOutlined />} />
            </Col>
            <Col span={8}>
              <Statistic title="Recettes Essayées cette Semaine" value={2} />
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default Home;
