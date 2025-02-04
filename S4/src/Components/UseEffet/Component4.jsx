import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons'; 
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); 
        setLoading(false);
      })
      .catch((error) => console.error('Erreur:', error));
  }, []); 

  return (
    <div>
      {loading ? <p>< LoadingOutlined /> Loading...</p> : 
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      }
    </div>
  );
}

export default UserList;
