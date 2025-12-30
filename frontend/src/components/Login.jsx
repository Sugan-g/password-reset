import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/login', { email, password });
            localStorage.setItem('token', res.data.token);
            alert('Login Successful');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="container mt-5 col-md-4">
            <h3 className="text-center">Login</h3>

            <form onSubmit={handleLogin}>
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

                <button className="btn btn-success w-100">
                    Login
                </button>
            </form>

            <div className="mt-3 text-center">
                <Link to="/forgot-password">Forgot Password?</Link>
            </div>
        </div>
    );
}
