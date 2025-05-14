import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { passwordUpdate } from '../services/authService';

const ForgotPassword = () => {
  const [form, setForm] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const resetData = {
        email: form.email,
        password: form.password
      };

      await passwordUpdate(resetData);
      setSuccess('Password reset successful!');
      setTimeout(() => navigate('/login'), 1500);
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
        <h2 className="text-center mb-1" style={{ fontWeight: 700 }}>Reset Password</h2>
        <p className="text-center mb-4" style={{ color: '#444' }}>Enter your email and new password</p>
        {error && (
          <div className="alert alert-danger text-center py-2" style={{ borderRadius: 10 }}>
            {error}
          </div>
        )}
        {success && (
          <div className="alert alert-success text-center py-2" style={{ borderRadius: 10 }}>
            {success}
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
          <Form.Group className="mb-3" controlId="formPassword">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaLock color="#888" />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
                minLength={6}
              />
            </InputGroup>
            <Form.Text className="text-muted">
              Password must be at least 6 characters long
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-4" controlId="formConfirmPassword">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaLock color="#888" />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
                minLength={6}
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
            Reset Password
          </Button>
        </Form>       
        
        <div className="text-center mt-3" style={{ color: '#444' }}>
          Remember your password?{' '}
          <span
            style={{ color: '#a445b2', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
