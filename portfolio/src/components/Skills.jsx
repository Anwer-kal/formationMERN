import React from "react";
import PropTypes from "prop-types"; 

const Skills = ({ skills }) => {
  return (
    <section id="skillssection">
      <h2>Skills</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill">
            <img src={skill.imgSrc} alt={`${skill.name} Logo`} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

Skills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      imgSrc: PropTypes.string.isRequired,  
      name: PropTypes.string.isRequired,    
    })
  ).isRequired,
};

export default Skills;
