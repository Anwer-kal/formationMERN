import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProvider } from './context/index'; // Import AuthContext

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider> {/* Wrap with AppProvider */}
          <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);