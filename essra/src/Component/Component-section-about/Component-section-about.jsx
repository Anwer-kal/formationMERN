import '././Component-section-about.css';

const About = () => {
    return (
        <section id="about">
            <h2>About Me</h2>
            <div className="about-container">
                <img 
                    src="http://hotprintdesign.com/wp-content/uploads/2019/02/no-profile-photo.jpg" 
                    alt="Your Picture" 
                    className="profile-picture" 
                />
                <p>I am a Master's student in Research in Artificial Intelligence and Data Analysis</p>
            </div>
        </section>
    );
}

export default About;
