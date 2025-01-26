import React from "react";

const About = ({ imgSrc, description }) => {
  return (
    <section id="about">
      <h2>About Me</h2>
      <div className="about-container">
        <img src={imgSrc} alt="Pictureess" className="profile-picture" />
        <p>{description}</p>
      </div>
    </section>
  );
};

export default About;
