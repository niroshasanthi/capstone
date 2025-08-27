import React, { useState } from 'react';
import { loginParent } from '../api/api.js';
import { jwtDecode } from 'jwt-decode';

const ParentLoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
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
            const response = await loginParent(formData);
            const token = response.data;

            // Store token in localStorage
            localStorage.setItem('token', token);

            // Decode JWT to get email
            const decoded = jwtDecode(token);
            const email = decoded.sub; // JWT subject contains the email

            setMessage(`Login successful! Welcome, ${email}`);
            setFormData({ email: '', password: '' });

        } catch (err) {
            console.error(err);

            if (err.response) {
                setError(err.response.data || `Error ${err.response.status}: ${err.response.statusText}`);
            } else if (err.request) {
                setError('No response from server. Please check your connection.');
            } else {
                setError(`Request error: ${err.message}`);
            }
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4">Parent Login</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
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

export default ParentLoginForm;
