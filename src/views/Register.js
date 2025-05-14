import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaIdCard, FaUserCircle, FaBriefcase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { register as registerApi } from '../services/authService';
import { getCampuses as getCampusesApi } from '../services/backService';

const Register = () => {
  const [form, setForm] = useState({ 
    firstname: '',
    lastname: '',
    department: '',
    role: '', 
    email: '', 
    password: '', 
    confirmPassword: '', 
    campus: '',
    identification: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [campuses, setCampuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getCampuses = async () => {
      try {
        setLoading(true);
        const response = await getCampusesApi();
        const data = await response;
        console.log('data.data : ', data.data);
        setCampuses(data.data);
      } catch (err) {
        console.log('err : ', err);
        setError('Failed to load campuses');
      } finally {
        setLoading(false);
      }
    };

    getCampuses();
  }, []);

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

    // Validate based on role
    if (!form.identification) {
      setError(`Please enter your ${form.role === 'student' ? 'student ID' : 'staff code'}`);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const registerData = {
        firstName: form.firstname,
        lastName: form.lastname,
        department: form.department,
        role: form.role,
        email: form.email,
        password: form.password,
        campus: form.campus,
        identification: form.identification
      };

      await registerApi(registerData);
      setSuccess('Registration successful!');
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
        <h2 className="text-center mb-1" style={{ fontWeight: 700 }}>Sign up</h2>
        <p className="text-center mb-4" style={{ color: '#444' }}>Create your account</p>
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
          <Form.Group className="mb-3" controlId="formFirstname">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaUserCircle color="#888" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastname">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaUserCircle color="#888" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDepartment">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaBriefcase color="#888" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Department (Optional)"
                name="department"
                value={form.department}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRole">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaUser color="#888" />
              </InputGroup.Text>
              <Form.Select
                name="role"
                value={form.role}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="admin staff">Admin Staff</option>
                <option value="lecturer">Lecturer</option>
              </Form.Select>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIdentification">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaIdCard color="#888" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                name="identification"
                value={form.identification}
                onChange={handleChange}
                placeholder={form.role === 'student' ? "Enter Student ID" : 
                          form.role === 'admin staff' ? "Enter Staff Code" : 
                          "Enter Lecturer Code"}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCampus">
            <InputGroup>
              <InputGroup.Text style={{ background: '#f3e6fa', border: 'none' }}>
                <FaBuilding color="#888" />
              </InputGroup.Text>
              <Form.Select
                name="campus"
                value={form.campus}
                onChange={handleChange}
                style={{ background: '#f3e6fa', border: 'none' }}
                required
                disabled={loading}
              >
                <option value="">Select Campus</option>
                {campuses.map((campus) => (
                  <option key={campus._id} value={campus._id}>
                    {campus.name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>
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
                placeholder="Password"
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
                placeholder="Confirm Password"
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
            Sign up
          </Button>
        </Form>       
        
        <div className="text-center mt-3" style={{ color: '#444' }}>
          Already have an account?{' '}
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

export default Register;
