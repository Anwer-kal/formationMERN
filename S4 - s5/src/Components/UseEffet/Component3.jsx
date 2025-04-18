import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erreur de récupération:', error));
  }, []); // L'effet s'exécute uniquement au montage

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}, {user.email}, {user.phone}</li>
      ))}
    </ul>
  );
}
 export default Users;