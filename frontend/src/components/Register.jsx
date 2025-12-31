import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/api/auth/register', { email, password });
            alert('Registration successful. Please login.');
        } catch (err) {
            alert(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 col-md-4">
            <h3 className="text-center">Register</h3>

            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <div className="mt-3 text-center">
                Already have an account? <Link to="/">Login</Link>
            </div>
        </div>
    );
}
