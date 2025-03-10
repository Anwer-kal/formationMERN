import React, { useEffect, useState } from "react";
import { Carousel } from "antd";

const ImageCarousel = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/pictures")
            .then((res) => res.json())
            .then((data) => {
                console.log("Données reçues du backend:", data);
                setImages(data.images);
            })
            .catch((err) => console.error("Erreur:", err));
    }, []);

    return (
        <Carousel autoplay>
            {images.map((img, index) => (
                <div key={index}>
                    <img 
                        src={`http://localhost:8000/pictures/${img.name}`} 
                    alt={`Image ${index}`}  />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
