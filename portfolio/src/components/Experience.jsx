import React from "react";
import PropTypes from 'prop-types';  

const Experience = ({ experiences }) => {
  return (
    <section id="experience">
      <h2>Experience</h2>
      {Array.isArray(experiences) && experiences.length > 0 ? (
        experiences.map((experience, index) => (
          <div key={index} className="experience-card">
            <img src={experience.imgSrc} alt={experience.companyName} />
            <div>
              <h3>{experience.companyName}</h3>
              <p>Role: {experience.role}</p>
              <p>date: {experience.date}</p>

              <p>{experience.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No experience available.</p>
      )}
    </section>
  );
};

Experience.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Experience;

