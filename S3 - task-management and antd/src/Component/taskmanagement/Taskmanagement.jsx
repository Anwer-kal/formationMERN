import { Button, Card, Col, Input, Layout, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// Task Column Component
const TaskColumn = ({ title, tasks, moveTask, columnId }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, columnId),
  });

  return (
    <Col xs={24} sm={12} md={8} ref={drop} style={{ padding: '10px' }}>
      <Card title={title} style={{ minHeight: '300px', background: '#f8f9fa' }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} moveTask={moveTask} columnId={columnId} />
        ))}
      </Card>
    </Col>
  );
};

// Task Card Component (Draggable)
const TaskCard = ({ task, moveTask }) => {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
  });

  return (
    <Card
      ref={drag}
      style={{
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <img
        src={task.imageUrl}
        alt="User"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <div>
        <Title level={5} style={{ margin: 0 }}>
          {task.name}
        </Title>
        <Text type="secondary">{task.date}</Text>
        <p style={{ margin: '5px 0' }}>{task.description}</p>
      </div>
    </Card>
  );
};

// Main Task Management Component
const TaskManagementApp = () => {
  const [tasks, setTasks] = useState([
    {
      id: uuidv4(),
      name: 'Makrem - Design React App',
      columnId: 'todo',
      description: 'Build a front-end design for the project.',
      date: '2025-02-01',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: uuidv4(),
      name: 'Salma - API Development',
      columnId: 'todo',
      description: 'Develop the backend API using Node.js.',
      date: '2025-02-03',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: uuidv4(),
      name: 'Aziz - Database Setup',
      columnId: 'inProgress',
      description: 'Set up and optimize the database schema.',
      date: '2025-02-02',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
  ]);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskImage, setTaskImage] = useState('');

  // Add a new task
  const addTask = () => {
    if (taskName.trim() === '') return;

    const newTask = {
      id: uuidv4(),
      name: taskName,
      columnId: 'todo',
      description: taskDescription,
      date: taskDate,
      imageUrl: taskImage || 'https://randomuser.me/api/portraits/lego/1.jpg', // Default image
    };

    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDescription('');
    setTaskDate('');
    setTaskImage('');
  };

  // Move Task between columns
  const moveTask = (taskId, targetColumnId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId: targetColumnId } : task
      )
    );
  };

  // Columns
  const columns = ['todo', 'inProgress', 'done'];

  const tasksByColumn = {
    todo: tasks.filter((task) => task.columnId === 'todo'),
    inProgress: tasks.filter((task) => task.columnId === 'inProgress'),
    done: tasks.filter((task) => task.columnId === 'done'),
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: 'white', fontSize: '24px', textAlign: 'center' }}>
        Task Management App with Drag and Drop
      </Header>

      <Content style={{ padding: '20px' }}>
        <Row gutter={16}>
          <Col span={24}>
            <Space>
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
              />
              <Input
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Enter task description"
              />
              <Input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                placeholder="Enter due date"
              />
              <Input
                value={taskImage}
                onChange={(e) => setTaskImage(e.target.value)}
                placeholder="Enter image URL"
              />
              <Button type="primary" onClick={addTask}>
                Add Task
              </Button>
            </Space>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: '20px' }}>
          {columns.map((columnId) => (
            <TaskColumn
              key={columnId}
              title={columnId === 'todo' ? 'To Do' : columnId === 'inProgress' ? 'In Progress' : 'Done'}
              tasks={tasksByColumn[columnId]}
              moveTask={moveTask}
              columnId={columnId}
            />
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

// App with Drag-and-Drop Provider
const App = () => (
  <DndProvider backend={HTML5Backend}>
    <TaskManagementApp />
  </DndProvider>
);

export default App;
