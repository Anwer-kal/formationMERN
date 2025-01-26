import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/" />;
}

function Dashboard() {
  return <h1>Tableau de bord</h1>;
}

function App() {
  const isAuthenticated = false; // À remplacer par une logique d'authentification réelle

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<h1>Page publique</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
