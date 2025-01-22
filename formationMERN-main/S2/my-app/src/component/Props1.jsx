import PropTypes from 'prop-types';

const MyComponent = ({ name, age, phone }) => {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      {phone ? <p>phone: {phone}</p> : <></>}
    </div>
  );
};

// Validation des types des props
MyComponent.PropTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  phone: PropTypes.number,

};

export default MyComponent;