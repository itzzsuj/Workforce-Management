import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainContent from './components/MainContent';
import Login from './Login/Login';
import EmployeeDashboard from './user/EmployeeDashboard'; 
import ManagerDashboard from './manager/ManagerDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<MainContent/>}></Route>
    <Route path="/Login" element={<Login/>}></Route>
    <Route path="/EmployeeDashboard" element={<EmployeeDashboard />}></Route>
    <Route path="/ManagerDashboard" element={<ManagerDashboard/>}></Route>
  </Routes>
  </BrowserRouter>
);