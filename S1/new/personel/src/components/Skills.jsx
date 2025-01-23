import React from 'react';
import '../components/styles.css';

const Skills = ({ skillsData }) => {
  return (
    <section id="skillssection">
      <h2>Skills</h2>
      <div className="skills-container">
        {skillsData.map((skill, index) => (
          <div key={index} className="skill">
            <img src={skill.src_img} alt={skill.name} />
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
