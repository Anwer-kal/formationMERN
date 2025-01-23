import React from 'react';

const Contact = (props) => {
  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <p>Email: <a href={`mailto:${props.name}@${props.mail}.com`}>{props.name}@{props.mail}.com</a></p>
    </section>
  )
}

export default Contact;
