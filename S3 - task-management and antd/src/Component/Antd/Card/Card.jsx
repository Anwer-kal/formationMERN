import React from 'react';
import { Card, Button } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

// Composant `ImageCard` qui accepte des props pour personnaliser l'image, le titre, et la description
const ImageCard = ({ imageSrc, title, description }) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={imageSrc} />}
    >
      <Card.Meta title={title} description={description} />
      <Button type="primary" icon={<LikeOutlined />} style={{ marginTop: 16 }}>
        Like
      </Button>
    </Card>
  );
};


export default ImageCard;
