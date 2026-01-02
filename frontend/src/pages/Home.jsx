import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
  const [isLogin, setIsLogin] = useState(false); // Register first
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await api.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        alert('Login successful');
        navigate('/');
      } else {
        await api.post('/api/auth/register', { email, password });
        alert('Registration successful. Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h4 className="text-center">{isLogin ? 'Login' : 'Register'}</h4>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <div className="text-center mt-3">
        {isLogin ? (
          <>
            No account?{' '}
            <button className="btn btn-link" onClick={() => setIsLogin(false)}>
              Register
            </button>
          </>
        ) : (
          <>
            Have an account?{' '}
            <button className="btn btn-link" onClick={() => setIsLogin(true)}>
              Login
            </button>
          </>
        )}
      </div>

      {isLogin && (
        <div className="text-center">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      )}
    </div>
  );
}
