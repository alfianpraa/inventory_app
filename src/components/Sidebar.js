// Sidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';



const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="d-flex align-items-center">
        <img 
          src={logo} 
          alt="Logo" 
          className="me-3" 
          style={{ width: '30px', height: '30px' }} 
        />
        <h5 className="mb-0">Penerbit Erlangga</h5>
      </div>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/kategori-produk">Kategori Produk</Link>
        </li>
        <li>
          <Link to="/halaman-produk">Halaman Produk</Link>
        </li>
        <li>
          <Link to="/Laporan">Laporan</Link>
        </li>
        <li>
          <Link to="/login">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
