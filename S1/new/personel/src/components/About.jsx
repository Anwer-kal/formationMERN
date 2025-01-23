import React from 'react';
import '../components/styles.css'
const About = (props) => {
  return(
    <section id="about">
      <h2>About Me</h2>
      <div class="about-container">
          <img src="http://hotprintdesign.com/wp-content/uploads/2019/02/no-profile-photo.jpg" alt="Your Picture" class="profile-picture"/>
          <p>I am a {props.pro} with a passion for {props.inter}.</p>
      </div>
    </section>
  )
}

export default About;
