import React from 'react';
import useFetch from '../CustomHooks/UseFetch.jsx';
import { Space, Table, Tag } from 'antd';

function UserList() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name), // Alphabetical sorting
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sortDirections: ['descend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    }
  ];
  


  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (

<Table columns={columns} dataSource={data} />

  );
}

export default UserList;
