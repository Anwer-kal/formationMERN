import PropTypes from 'prop-types';
import './Componentessra.css'

const MyComponent = ({ name, age, phone , email ,addrese,sexe}) => {
  return (
    <div className='essra'>
      <p><h1>Name: {name}</h1></p>
      <p><h2>Age: {age}</h2></p>
      {phone ? <p>phone: {phone}</p> : <></>} 
      {email ? <p>Email: {email}</p> : <></>}
      {addrese ? <p>Addrese: {addrese}</p> : <></>}
      {sexe ? <p>Sexe: {sexe}</p> : <></>}



    </div>
  );
};

// Validation des types des props
MyComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  phone: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  addrese: PropTypes.string,
  sexe:PropTypes.string.isRequired


};

export default MyComponent;
