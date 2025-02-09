import React from "react";
import { Typography, Row, Col, Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const sensitiveData = [
  {
    title: "barcelone",
    image: "/fsb.png",
    info: "Détails sensibles du FC Barcelone. Cela inclut les données internes sur les joueurs, les finances, et les performances.",
    data: "Revenus annuels: 900M€, Dépenses: 700M€, Classement actuel: 2ème",
  },
  {
    title: "Arsenal",
    image: "/Arsenal.png",
    info: "Détails sensibles sur Arsenal. Informations sur le budget, les joueurs et les résultats de la saison.",
    data: "Revenus annuels: 500M€, Dépenses: 400M€, Classement actuel: 5ème",
  },
  {
    title: "real-madrid",
    image: "/RM.png",
    info: "Détails sensibles du Real Madrid, y compris des informations exclusives sur les négociations et les joueurs clés.",
    data: "Revenus annuels: 1.2B€, Dépenses: 1B€, Classement actuel: 1er",
  },
];

function AdminSettings() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>Paramètres Administrateur</Title>
      <Paragraph style={{ textAlign: "center" }}>
        Voici les informations sensibles concernant les clubs de football. Cette page est réservée aux administrateurs.
      </Paragraph>

      <Divider />

      {sensitiveData.map((club, index) => (
        <div key={index} style={{ marginBottom: 40 }}>
          <Row gutter={[16, 16]} align="middle">
            <Col span={6}>
              <img
                alt={club.title}
                src={club.image}
                style={{height:"210px", width:"210px"}}
              />
            </Col>
            <Col span={18}>
              <Title level={3}>{club.title}</Title>
              <Paragraph>{club.info}</Paragraph>
              <Paragraph>{club.data}</Paragraph>
              <Button
                type="primary"
                onClick={() => navigate(`/admin/settings/${club.title.toLowerCase()}/details`)}
              >
                Voir Détails
              </Button>
            </Col>
          </Row>
          <Divider />
        </div>
      ))}
    </div>
  );
}

export default AdminSettings;
