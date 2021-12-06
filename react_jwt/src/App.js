import logo from './logo.svg';
import './App.css';
import { Button, Alert } from 'antd';
import LoginForm from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Profil from './components/Profil'
import Produk from './components/Produk'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/produk" element={<Produk />} />
      </Routes>
    </Router>
  );
}

export default App;
