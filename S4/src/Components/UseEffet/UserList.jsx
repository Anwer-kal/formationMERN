import React from 'react';
import { Table } from 'antd';
import useFetch from '../CustomHooks/UseFetch.jsx';

function UserList() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (error) return <p>Erreur : {error}</p>;
  if (loading) return <p>Chargement...</p>;

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      onFilter: (value, record) => record.name.indexOf(value) === 0,

    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone), 
    },
    {
      title: 'Site Web',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Âge',
      dataIndex: 'age',
      key: 'age',
    }
  ];

  return (
    <Table columns={columns} dataSource={users} rowKey="id" />
  );
}

export default UserList;

