import React, { useContext, useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/authService';
import { AuthContext } from '../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginAdmin(email, password);
      setToken(data.token);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
   <Container fluid className="admin-login-container py-5 ">
      <Row className="justify-content-center">
        <Col md={5} className="admin-login-card ">
          <h2 className="admin-login-title">Admin Login</h2>
          <Form className="admin-login-form" onSubmit={handleSubmit}>
            {error && <Alert variant="danger" className="error-alert">{error}</Alert>}
            
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>

            <center><Button type="submit" className="admin-login-btn">Login</Button></center>
          </Form>
        </Col>
      </Row>
    </Container>

  );
};

export default AdminLoginPage;