// src/App.js
import React from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import UploadDownload from './Component/UploadDownload';
import UserManagement from './Component/UserManagement';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%', borderRight: 0 }}>
      
          <Menu.Item key="1" icon={<UserOutlined />}>
            Gestion des Utilisateurs
          </Menu.Item>
          <Menu.Item key="2" icon={<UploadOutlined />}>
            Upload/Download
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
          <Tabs defaultActiveKey="1">
          <TabPane tab="Gestion des Utilisateurs" key="1">
              <UserManagement />
            </TabPane>
            <TabPane tab="Upload/Download" key="2">
              <UploadDownload />
            </TabPane>
           
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
