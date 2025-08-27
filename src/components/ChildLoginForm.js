import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { loginChild } from '../api/api';

const ChildLoginForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await loginChild(formData);
      const token = response.data;
      localStorage.setItem('childToken', token);

      const decoded = jwtDecode(token);
      setMessage(`Login successful! Welcome, ${decoded.sub}`);
      setFormData({ name: '', password: '' });
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data || `Error ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server. Check connection.');
      } else {
        setError(`Request error: ${err.message}`);
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Child Login</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default ChildLoginForm;
