// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dash';
import CategoryPage from './components/CategoryPage';
import ProductPage from './components/ProductPage';
import Laporan from './components/Laporan';
import Sidebar from './components/Sidebar'; // Impor Sidebar
import './App.css';

function MainApp() {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className={`app-container ${location.pathname !== '/login' ? 'with-sidebar' : ''}`}>
      {/* Sidebar hanya muncul jika bukan halaman login */}
      {location.pathname !== '/login' && <Sidebar />}
      
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/kategori-produk"
            element={<CategoryPage onCategorySelect={setSelectedCategory} />}
          />
          <Route
            path="/halaman-produk"
            element={<ProductPage selectedCategory={selectedCategory} />}
          />
          <Route path="/Laporan" element={<Laporan />} />
          <Route path="/" element={<Login />} /> {/* Default to login page */}
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}
