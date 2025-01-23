import React from 'react';

const HeroSection = (props) => {
  return (
    <div className="hero">
      <h1>Hello, I'm {props.name}</h1>
      <p>Welcome to my portfolio website</p>
    </div>
  );
}

export default HeroSection;
