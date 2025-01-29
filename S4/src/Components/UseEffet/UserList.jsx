import { Table } from 'antd'; // Import Table & Spin from Ant Design
import React from 'react';
import useFetch from '../CustomHooks/UseFetch.jsx';

function UserList() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name), // Alphabetical sorting
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.name.localeCompare(b.name), // Alphabetical sorting
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.name.localeCompare(b.name), // Alphabetical sorting
    },
  ];

  return (
    
    <Table dataSource={data} columns={columns} />
  );
}  

export default UserList;
