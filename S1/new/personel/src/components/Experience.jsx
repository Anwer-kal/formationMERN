import React from 'react';
import '../components/styles.css'
// import img from '../assets/datadoit.jpg'
const Experience = (props) => {
  return(
    <>
        <h2>Experience</h2>
        <div class="experience-card">
            <img src={props.img} alt="DataDoit"/>
            <div>
                <h3>{props.title}</h3>
                <p>Role: {props.Role}</p>
                <p>Description: {props.desc}</p>
            </div>
        </div>
    </>
  )
}

export default Experience;
