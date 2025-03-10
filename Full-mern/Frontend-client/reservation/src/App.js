// src/App.js
import React from 'react';
import { Layout } from 'antd';
import ClientList from './components/ClientList';
import ReservationList from './components/ReservationList';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <ClientList/>
          <ReservationList/>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023</Footer>
    </Layout>
  );
};

export default App;
