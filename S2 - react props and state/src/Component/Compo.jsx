import PropTypes from 'prop-types';
import './Compo.css';
const Compo = ({ name, age, phone , address , pays}) => {
  return (
    <div>
        <table>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Pays</th>
            </tr>
            <tr>
                <td>{name}</td>
                <td>{age}</td>
                <td>{phone}</td>
                <td>{address}</td>
                <td>{pays}</td>
            </tr>
        </table>
      {/* <p>Name: {name}</p>
      <p>Age: {age}</p>
      {phone ? <p>phone: {phone}</p> : <></>}
      <p>addresse {address}</p>
      <p>pays {pays}</p> */}
    </div>
  );
};

// Validation des types des props
Compo.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  phone: PropTypes.number.isRequired,
  address: PropTypes.string,
  pays: PropTypes.string.isRequired
};

export default Compo;
