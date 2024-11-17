import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ErrorPage from './components/ErrorPage';


function PrivateRoute({children}){

  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function App() {

  return (
    <>
     <Router>
      <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
        <Dashboard />
        </PrivateRoute>
        } />
      <Route path="*" element={<ErrorPage />} />
      </Routes>
     </Router>
    </>
  )
}

export default App
