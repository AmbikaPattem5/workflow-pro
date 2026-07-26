import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import React from 'react';
import ReactDom from 'react-dom/client';
import { BrowserRouter} from 'react-router-dom';
import App from './App.tsx'
import './practice.ts'
import { AuthProvider } from './context/AuthContext.tsx';
ReactDom.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
