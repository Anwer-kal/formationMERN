import React from "react";
import PropTypes from "prop-types";
import '../styles.css';

const Hero = ({ title, subtitle }) => {
  return (
    <div className="hero">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};
Hero.propTypes = {
  title: PropTypes.string.isRequired,    
  subtitle: PropTypes.string.isRequired  
};

export default Hero;
