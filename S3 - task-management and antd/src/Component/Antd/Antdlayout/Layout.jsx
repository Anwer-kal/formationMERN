import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';

const { Header, Content, Sider, Footer } = Layout;

const AntdLayoutExample = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header className="header" style={{ background: '#fff', padding: 0 }}>
        <div style={{ padding: '0 20px', fontSize: '20px', fontWeight: 'bold' }}>
          Ant Design Layout Example
        </div>
      </Header>

      {/* Layout Body */}
      <Layout style={{ padding: '0 24px 24px' }}>
        {/* Sider (Menu latéral) */}
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
            <Menu.Item key="3" icon={<FileTextOutlined />}>
              Documents
            </Menu.Item>
          </Menu>
        </Sider>

        {/* Main Content */}
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Documents</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
            }}
          >
            <h2>Welcome to the Ant Design Layout Example!</h2>
            <p>This is an example of a simple layout with header, sidebar, and content area.</p>
          </Content>
        </Layout>
      </Layout>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>Ant Design Layout Example ©2025</Footer>
    </Layout>
  );
};

export default AntdLayoutExample;
