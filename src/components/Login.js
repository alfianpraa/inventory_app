import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import logo from '../Assets/logo.png';
import '../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulasi pengecekan login
    if (username === 'admin' && password === 'password123') {
      // Arahkan ke halaman Dashboard jika login berhasil
      navigate('/dashboard');
    } else {
      // Menampilkan error jika login gagal
      setError('Invalid username or password');
    }
  };

  return (
    <Container 
      fluid 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <div className="col-md-4 form-container p-4">
        <div className="d-flex align-items-center mb-3">
          <img 
            src={logo} 
            alt="Logo" 
            className="me-3" 
            style={{ width: '50px', height: '50px' }} 
          />
          <h2 className="mb-0">Penerbit Erlangga</h2>
        </div>
        <h3 className="mb-4 text-center">Login</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
