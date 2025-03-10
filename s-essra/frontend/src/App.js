// src/App.js
import React from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { UploadOutlined, BookOutlined } from '@ant-design/icons';
import UploadDownload from './Component/UploadDownload';
import BooksManagement from './Component/BooksManagement'; 
import ImageCarousel from './Component/Image';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu mode="inline" defaultSelectedKeys={['2']} style={{ height: '100%', borderRight: 0 }}>
          <Menu.Item key="2" icon={<UploadOutlined />}>
            Upload/Download
          </Menu.Item>
          <Menu.Item key="3" icon={<BookOutlined />}>
            Gestion des Livres
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
          }}
        >
          <Tabs defaultActiveKey="2">
           
            <TabPane tab="Gestion des Livres" key="3">
              <BooksManagement />
            </TabPane>
            <TabPane tab="Upload/Download" key="2">
              <UploadDownload />
            </TabPane>
            <TabPane tab="Galerie d'Images" key="4">
              <ImageCarousel />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;



