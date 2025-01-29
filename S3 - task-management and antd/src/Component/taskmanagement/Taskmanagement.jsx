import React, { useState } from 'react';
import { Layout, Card, Col, Row, Button, Input, Space } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Déstructure Layout d'Ant Design
const { Header, Content } = Layout;

// Composant représentant une colonne de tâches (par exemple : À Faire, En Cours, Terminé)
const TaskColumn = ({ title, tasks, moveTask, columnId }) => {
  // Utilisation du hook `useDrop` de React DnD pour rendre cette colonne "droppable"
  const [, drop] = useDrop({
    accept: 'TASK', // Indique que ce composant accepte les éléments de type 'TASK'
    drop: (item) => moveTask(item.id, columnId), // Lorsqu'un élément est déposé, il appelle `moveTask` pour le déplacer
  });

  return (
    <Col xs={24} sm={12} md={8} ref={drop} style={{ margin: '0 0px' }}>
      <Card title={title} style={{ minHeight: '200px' }}>
        {/* Affichage de chaque tâche de cette colonne */}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} moveTask={moveTask} columnId={columnId} />
        ))}
      </Card>
    </Col>
  );
};

// Composant représentant une tâche individuelle dans une colonne
const TaskCard = ({ task, moveTask, columnId }) => {
  // Utilisation du hook `useDrag` de React DnD pour rendre chaque tâche "draggable"
  const [, drag] = useDrag({
    type: 'TASK', // Le type d'élément à déplacer est 'TASK'
    item: { id: task.id }, // L'élément contient l'id de la tâche à déplacer
  });

  return (
    <div
      ref={drag} // Référence pour activer la fonctionnalité de drag
      style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
    >
      {/* Affichage du nom de la tâche */}
      {task.name}
    </div>
  );
};

// Composant principal de l'application
const TaskManagementApp = () => {
  // Initialisation des tâches avec `useState`
  const [tasks, setTasks] = useState([
    { id: uuidv4(), name: 'Task 1: Buy groceries', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 2: Complete project', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 3: Call the bank', columnId: 'inProgress' },
    { id: uuidv4(), name: 'Task 4: projet react 1 - Makrem', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 5: projet react 2 - Salma', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 6: projet react 3 Essra', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 7: projet react 4 Malek ', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 8: projet react 5 Aziz', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 9: projet react 6 reaf', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 10: projet react 7', columnId: 'todo' },
    { id: uuidv4(), name: 'Task 11: projet react 8', columnId: 'todo' },
  ]);
  
  const [taskName, setTaskName] = useState(''); // État pour le nom de la nouvelle tâche

  // Fonction pour ajouter une nouvelle tâche
  const addTask = () => {
    if (taskName.trim() === '') return; // Empêche d'ajouter une tâche vide

    const newTask = {
      id: uuidv4(), // Génération d'un id unique pour la nouvelle tâche
      name: taskName, // Nom de la tâche provenant de l'input
      columnId: 'todo', // Par défaut, la tâche est ajoutée dans la colonne "À faire"
    };

    // Mise à jour de l'état des tâches avec la nouvelle tâche ajoutée
    setTasks([...tasks, newTask]);
    setTaskName(''); // Réinitialisation du champ de saisie
  };

  // Fonction pour déplacer une tâche d'une colonne à une autre
  const moveTask = (taskId, targetColumnId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, columnId: targetColumnId } : task // Met à jour la colonne de la tâche
      )
    );
  };

  // Colonnes disponibles dans l'application
  const columns = ['todo', 'inProgress', 'done'];

  // Filtrage des tâches pour les organiser par colonne
  const tasksByColumn = {
    todo: tasks.filter((task) => task.columnId === 'todo'),
    inProgress: tasks.filter((task) => task.columnId === 'inProgress'),
    done: tasks.filter((task) => task.columnId === 'done'),
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* En-tête de l'application */}
      <Header style={{ color: 'white', fontSize: '24px', textAlign: 'center' }}>
        Task Management App with Drag and Drop
      </Header>
      
      <Content style={{ padding: '20px' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Space>
              {/* Champ de saisie pour ajouter une nouvelle tâche */}
              <Input
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)} // Met à jour le nom de la tâche
                placeholder="Enter task name"
              />
              {/* Bouton pour ajouter la nouvelle tâche */}
              <Button type="primary" onClick={addTask}>
                Add Task
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Affichage des colonnes avec les tâches */}
        <Row gutter={24} style={{ marginTop: '20px' }}>
          {columns.map((columnId) => (
            <TaskColumn
              key={columnId}
              title={columnId === 'todo' ? 'À Faire' : columnId === 'inProgress' ? 'En Cours' : 'Terminé'}
              tasks={tasksByColumn[columnId]} // Passe les tâches filtrées pour chaque colonne
              moveTask={moveTask} // Passe la fonction pour déplacer une tâche
              columnId={columnId} // Passe l'id de la colonne
            />
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

// Composant racine de l'application avec le provider DnD
const App = () => (
  <DndProvider backend={HTML5Backend}>
    <TaskManagementApp /> {/* Affiche le composant principal */}
  </DndProvider>
);

export default App;
