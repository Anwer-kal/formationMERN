import React from 'react';

const ChildComponent = ({name, surName, email}) => {
  return (
    <>
       <hr></hr>
     <h2 style={{color:"red"}} >Name: {name}!</h2>
     <h2>SurName: {surName}!</h2>
     <h2>email: {email}!</h2>
     <br></br>
     <hr></hr>
    </>
  );
};

export default ChildComponent;