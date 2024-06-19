import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import {ContextProvider} from './Contexts/cardData';
import {AuthProvider } from './Contexts/Authcontext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <ContextProvider>
         <App />
    </ContextProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


