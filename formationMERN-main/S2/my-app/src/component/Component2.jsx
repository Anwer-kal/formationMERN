import React from 'react';

const ChildComponent = (props) => {
  return (
    <>
       <hr></hr>
     <h2 style={{color:"red"}} >Name: {props.name}!</h2>
     <h2>SurName: {props.surName}!</h2>
     <h2>email: {props.email}!</h2>
     <br></br>
     <hr></hr>

    </>
  );
};

export default ChildComponent;