import React from "react";
import PropTypes from "prop-types"; 
import '../styles.css';

function Nav(props) {
  return (
    <>
      {console.log(props)}
      <header>
        <nav>
          <ul>
            {props.item.map((e, index) => {
              console.log(e);
              return (
                <li key={index}>
                  <a href="#about">{e.title}</a>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
    </>
  );
}
Nav.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,   
      title: PropTypes.string.isRequired 
    })
  ).isRequired  
};

export default Nav;


