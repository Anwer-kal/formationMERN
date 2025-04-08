import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { 
  Input, 
  Button, 
  Card, 
  Avatar, 
  List, 
  Spin, 
  Typography,
  Layout,
  Space
} from 'antd';
import { 
  SendOutlined, 
  UserOutlined, 
  RobotOutlined 
} from '@ant-design/icons';

const { Text } = Typography;
const { Content } = Layout;
// https://console.groq.com/docs/models
const GroqChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider ?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_KEY = 'gsk_DvAZzYrnLfrndIMoPodzWGdyb3FYctBWW15q2jxCb9A9TPlBIQb'; // Remplacez par votre clé API
  const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

  // Auto-scroll vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(API_URL, {
        model: 'llama-3.3-70b-versatile',
        messages: [...messages, userMessage],
        temperature: 0.7,
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const botMessage = response.data.choices[0].message;
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur avec l\'API Groq:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Désolé, une erreur s\'est produite lors de la génération de la réponse.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <Card
          title="Chatbot avec Groq API"
          bordered={false}
          headStyle={{ borderBottom: 0 }}
          bodyStyle={{ padding: 0 }}
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        >
          <div style={{ 
            height: '500px', 
            overflowY: 'auto', 
            padding: '16px',
            borderBottom: '1px solid #f0f0f0'
          }}>
            <List
              itemLayout="horizontal"
              dataSource={messages}
              renderItem={(message, index) => (
                <List.Item 
                  style={{ 
                    padding: '12px 0',
                    alignItems: 'flex-start',
                    backgroundColor: index % 2 === 0 ? '#fafafa' : 'white'
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={message.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                        style={{ 
                          backgroundColor: message.role === 'user' ? '#1890ff' : '#722ed1'
                        }}
                      />
                    }
                    title={
                      <Text strong>
                        {message.role === 'user' ? 'Vous' : 'Assistant Groq'}
                      </Text>
                    }
                    description={message.content}
                  />
                </List.Item>
              )}
            />
            {loading && (
              <div style={{ textAlign: 'center', padding: '16px' }}>
                <Spin tip="L'assistant réfléchit..." />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
            <Space.Compact style={{ width: '100%' }}>
              <Input
                size="large"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                disabled={loading}
              />
              <Button 
                type="primary" 
                size="large" 
                htmlType="submit" 
                icon={<SendOutlined />}
                loading={loading}
              >
                Envoyer
              </Button>
            </Space.Compact>
          </form>
        </Card>
      </Content>
    </Layout>
  );
};

export default GroqChatbot;