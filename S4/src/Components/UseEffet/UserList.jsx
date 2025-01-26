import React from 'react';
import useFetch from '../CustomHooks/UseFetch.jsx';

function UserList() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
