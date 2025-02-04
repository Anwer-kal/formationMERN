import React, { useState } from 'react';
import { Layout, Card, Col, Row, Button, Input, Space } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const { Header, Content } = Layout;

// Composant représentant une colonne de tâches
const TaskColumn = ({ title, tasks, moveTask, columnId }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => moveTask(item.id, columnId),
  });

  return (
    <Col xs={24} sm={12} md={8} ref={drop} style={{ margin: '0 0px' }}>
      <Card title={title} style={{ minHeight: '200px' }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} moveTask={moveTask} />
        ))}
      </Card>
    </Col>
  );
};

// Composant représentant une tâche individuelle
const TaskCard = ({ task }) => {
  const [, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
  });

  return (
    <div
      ref={drag}  style={{display: 'flex',alignItems: 'center',margin: '10px 0',padding: '10px',border: '1px solid #ddd',borderRadius: '4px',}}>
      {task.image && (
        <img src={task.image}  alt="img"
          style={{width: '80px',height: '80px',borderRadius: '4px',marginRight: '15px',}}
        />
      )}
      <div>
      <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold',marginLeft:'250px',  color:'red'}}>
          {task.priority}
      </h3>
      <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold',marginRight:'300' }}>
          {task.name}
      </h3>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', textAlign:'center' }}>
          {task.date}
      </h3>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', textAlign:'center' }}>
          {task.task}
      </h3>
      <p style={{ margin: '5px', fontSize: '14px', color: '#555' }}>
          {task.description }
        </p>
      </div>
    </div>
  );
};
// Composant principal
const TaskManagementApp = () => {
  const [tasks, setTasks] = useState([
    { id: uuidv4(), task: 'Task 1: Buy groceries', name: 'Essra jegham', columnId: 'todo', description: 'Go and buy vegetables and fruits.',image:'logo192.png',priority:'High' , date:'11/12/205'},
    { id: uuidv4(), task: 'Task 2: Complete project', name: 'Essra jegham', columnId: 'todo', description: 'Go and buy vegetables and fruits',image:'logo192.png',priority:'Low'  , date:'11/12/205'},
    { id: uuidv4(), task: 'Task 3: Call the bank' , name: 'Essra jegham', columnId: 'inProgress', description: 'Go and buy vegetables and fruits',image:'logo192.png',priority:'LOW'  , date:'11/12/205'},
    { id: uuidv4(), task: 'Task 4: Write blog post', name: 'Essra jegham', columnId: 'done' , description: 'Go and buy vegetables and fruits',image:'logo192.png',priority:'High'  , date:'11/12/205' },
  ]);

  const [taskName, setTaskName] = useState('');

  const addTask = () => {
    if (taskName.trim() === '') return;
    const newTask = {
      id: uuidv4(),
      name: taskName,
      columnId: 'todo',
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
  };

  const moveTask = (taskId, targetColumnId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId: targetColumnId } : task
      )
    );
  };

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
          <Col span={12}>
            <Space>
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Enter task name"
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
              title={columnId === 'todo' ? 'À Faire' : columnId === 'inProgress' ? 'En Cours' : 'Terminé'}
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
const App = () => (
  <DndProvider backend={HTML5Backend}>
    <TaskManagementApp />
  </DndProvider>
);

export default App;
