import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/authService';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loginData = {
        email: form.email,
        password: form.password
      };
      const data = await loginApi(loginData);
      // Save token or user info if needed: localStorage.setItem('token', data.token);
      navigate('/dashboard'); // Change '/dashboard' to your desired route
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(90deg, #fff6b7 0%, #f6416c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container style={{ maxWidth: 400, background: '#fff', borderRadius: 20, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
        <h2 className="text-center mb-1" style={{ fontWeight: 700 }}>Smart Campus Portal</h2>
        <p className="text-center mb-4" style={{ color: '#444' }}>Enter your credential to login</p>
        {error && (
          <div className="alert alert-danger text-center py-2" style={{ borderRadius: 10 }}>
            {error}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaEnvelope color="#888" />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formPassword">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaLock color="#888" />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
              />
            </InputGroup>
          </Form.Group>
          <Button
            type="submit"
            className="w-100 mb-3"
            style={{
              background: 'linear-gradient(90deg, #a445b2 0%, #f6416c 100%)',
              border: 'none',
              borderRadius: 24,
              fontWeight: 600,
              fontSize: 18,
              padding: '10px 0',
              boxShadow: '0 2px 8px rgba(164,69,178,0.1)'
            }}
          >
            Login
          </Button>
        </Form>
        <div className="text-center mb-3">
          <span
            onClick={() => navigate('/accountreset')}
            style={{ color: '#a445b2', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}
          >
            Forgot password?
          </span>
        </div>
        <div className="text-center" style={{ color: '#444' }}>
          Dont have an account?{' '}
          <span
            style={{ color: '#a445b2', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </span>
        </div>
      </Container>
    </div>
  );
};

export default Login;
