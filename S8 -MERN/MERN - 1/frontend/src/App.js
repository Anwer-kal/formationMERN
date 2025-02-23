// src/App.js
import React from 'react';
import { Layout } from 'antd';
import ProductList from './components/ProductList';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout>
      <Header>
        <div className="logo" />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <ProductList />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023</Footer>
    </Layout>
  );
};

export default App;
