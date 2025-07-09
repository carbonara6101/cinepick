// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';  // 변경!
import './index.css';
import './App.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);             // createRoot로 초기화
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
