import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Register from './views/Register';
import ForgotPassword from './views/ForgotPassword';
import Dashboard from './views/Dashboard';
function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/login" element={<Login />} />     
        <Route path="/register" element={<Register />} />
        <Route path="/accountreset" element={<ForgotPassword />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </div>
  );
}

export default App;
