import { useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgot = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/auth/forgot-password', { email });
            setMessage(res.data.message || 'Reset link sent to your email');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error sending reset link');
        }
    };

    return (
        <div className="container mt-5 col-md-4">
            <h3 className="text-center">Forgot Password</h3>

            <form onSubmit={handleForgot}>
                <input
                    className="form-control mb-2"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button className="btn btn-warning w-100">Send Reset Link</button>
            </form>

            {message && <div className="alert alert-info mt-3">{message}</div>}

            <div className="mt-3 text-center">
                <Link to="/api/auth/login">Back to Login</Link>
            </div>
        </div>
    );
}
