import './Component-section-experience.css';


const Experience = ({ title, image, company, role, description }) => {
    return (
        <section id="experience">
            <h2>{title}</h2>
            <div className="experience-card">
                <img src={'../assets/OBG.jpg'>} />
                <div>
                    <h3>{company}</h3>
                    <p>Role: {role}</p>
                    <p>Description: {description}</p>
                </div>
            </div>
        </section>
    );
}

export default Experience;

