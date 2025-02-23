// src/App.js
import React from 'react';
import { Layout, Menu, Tabs } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import UploadDownload from './Component/UpdoadDownload';
import LivreManagement from './Component/LivreManagement';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#997a8d' }}>
    {/* Sider (menu latéral) */}
    <Sider width={250} style={{ background: '#0a1929', color: '#997a8d', padding: '20px 10px' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{
          height: '100%',
          borderRight: '1px solidrgb(174, 146, 174)',
          fontSize: '16px',
          color: '#fff',
          background: '#febed2',
          borderRadius: '8px',
        }}
      >
        <Menu.Item key="1" icon={<UserOutlined />} style={menuItemStyle}>
          Gestion des Livres
        </Menu.Item>
        <Menu.Item key="2" icon={<UploadOutlined />} style={menuItemStyle}>
          Upload/Download
        </Menu.Item>
      </Menu>
    </Sider>

    {/* Layout principal */}
    <Layout style={{ padding: '0 24px 24px', backgroundColor: '#fafafa' }}>
      <Content
        style={{
          padding: '40px 50px',
          margin: 0,
          minHeight: 'calc(100vh - 64px)', // Ajustement de la hauteur
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Onglets */}
        <Tabs
          defaultActiveKey="1"
          tabPosition="top"
          style={{
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
          }}
        >
          <TabPane
            tab={
              <span style={{ fontSize: '18px', fontWeight: 600, color: 'red' }}>
                Gestion des livres
              </span>
            }
            key="1"
          >
            <LivreManagement />
          </TabPane>
          <TabPane
            tab={
              <span style={{ fontSize: '18px', fontWeight: 600, color: 'red' }}>
                Upload/Download
              </span>
            }
            key="2"
          >
            <UploadDownload />
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  </Layout>
);
};

// Style des éléments du menu (noms des sections)
const menuItemStyle = {
fontSize: '18px',
fontWeight: '500',
transition: 'all 0.3s ease',
borderRadius: '6px',
};


export default App;


