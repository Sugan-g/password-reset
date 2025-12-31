import { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/auth/register', { name, email, password });
            alert('Registration successful. Please login.');
            navigate('/api/auth/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="container mt-5 col-md-4">
            <h3 className="text-center">Register</h3>

            <form onSubmit={handleRegister}>
                <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="form-control mb-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="form-control mb-2"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn btn-primary w-100">Register</button>
            </form>

            <div className="mt-3 text-center">
                <Link to="/api/auth/login">Already have an account? Login</Link>
            </div>
        </div>
    );
}
