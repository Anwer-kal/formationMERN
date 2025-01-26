import React from "react";
import PropTypes from "prop-types"; 
import '../styles.css';


const Projects = ({ projects }) => {
  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired, 
      description: PropTypes.string.isRequired, 
    })
  ).isRequired, 
};

export default Projects;
