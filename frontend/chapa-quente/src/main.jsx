import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Pedido from './components/Pedido'
import Produtos from './components/Produtos'
import Router from './components/Router';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Router />
    <Footer />
  </React.StrictMode>
)
