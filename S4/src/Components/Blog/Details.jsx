import React from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Descriptions } from "antd";

const { Title, Paragraph } = Typography;

// Données détaillées des clubs
const clubDetails = {
  barcelone: {
    name: "FC Barcelone",
    founded: "1899",
    stadium: "Camp Nou",
    trophies: "5 Ligues des Champions, 27 La Liga",
    description: "Le FC Barcelone est un club espagnol de renommée mondiale, connu pour son jeu spectaculaire.",
    image: "/fsb.png",
  },
  arsenal: {
    name: "Arsenal",
    founded: "1886",
    stadium: "Emirates Stadium",
    trophies: "13 Premier League, 14 FA Cup",
    description: "Arsenal est un club de football anglais basé à Londres, réputé pour son style offensif.",
    image: "/arsenal.png",
  },
  "real-madrid": {
    name: "Real Madrid",
    founded: "1902",
    stadium: "Santiago Bernabéu",
    trophies: "14 Ligues des Champions, 35 La Liga",
    description: "Le Real Madrid est l'un des clubs les plus titrés de l'histoire du football.",
    image: "/RM.png",
  },
};

function Details() {
    const { clubName } = useParams();
    const club = clubDetails[clubName];

    if (!club) {
        return <Title level={2} style={{ textAlign: "center" }}>Club non trouvé</Title>;
    }

    return (
      <Card title={club.name} style={{ width: "80%", margin: "20px auto", textAlign: "center" }}>
        <img src={club.image} alt={club.name} style={{height:"210px", width:"210px", borderRadius: 8 }} />
        <Paragraph style={{ marginTop: 16 }}>{club.description}</Paragraph>

        <Descriptions title="Informations du Club" bordered column={1}>
            <Descriptions.Item label="Année de Fondation">{club.founded}</Descriptions.Item>
            <Descriptions.Item label="Stade">{club.stadium}</Descriptions.Item>
            <Descriptions.Item label="Trophées">{club.trophies}</Descriptions.Item>
        </Descriptions>
      </Card>
    );
}

export default Details;
