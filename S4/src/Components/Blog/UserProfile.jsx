import React from "react";
import { Card, Typography, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const footballClubs = [
  {
    title: "FC Barcelone",
    image: "/fsb.png",
    link: "barcelone",
  },
  {
    title: "Arsenal",
    image: "/Arsenal.png",
    link: "arsenal",
  },
  {
    title: "Real Madrid",
    image: "/RM.png",
    link: "real-madrid",
  },
];

function UserProfile() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <Title level={2} style={{ textAlign: "center" }}>Profil Utilisateur</Title>
      <Title level={3} style={{ textAlign: "center" }}>Découvrez les Clubs de Football</Title>

      <Row gutter={[16, 16]} justify="center">
        {footballClubs.map((club, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={club.title} src={club.image} />}
              onClick={() => navigate(`/user/profile/${club.link}/details`)} // Redirige vers /user/profile/{club}
              
            >
              <Card.Meta title={club.title} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default UserProfile;
