
import '../styles.css';

function About(props) {

  return (
    <div className="App">
        <section id="about">
            <h2>About Me</h2>
            <div className="about-container">
              <br></br>
                <img src={props.picture} alt="Your profile pict" className="profile-picture" />
                <p>{props.description}.</p>
            </div>
        </section>

    </div>
  );
}

export default About;
