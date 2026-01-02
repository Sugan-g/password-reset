import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [isLogin, setIsLogin] = useState(false); // Register first
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post('/api/auth/login', { email, password });
        login(res.data.token); // ✅ IMPORTANT
        alert('Login successful');
        navigate('/');
      } else {
        await api.post('/api/auth/register', { email, password });
        alert('Registration successful. Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body p-4">

              <h4 className="text-center mb-3">
                {isLogin ? 'Login' : 'Register'}
              </h4>

              <form onSubmit={handleSubmit}>
                <input
                  className="form-control mb-3"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="form-control mb-3"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="btn btn-primary w-100" disabled={loading}>
                  {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
                </button>
              </form>

              <div className="text-center mt-3">
                {isLogin ? (
                  <>
                    <span>No account? </span>
                    <button className="btn btn-link p-0" onClick={() => setIsLogin(false)}>
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    <span>Already have an account? </span>
                    <button className="btn btn-link p-0" onClick={() => setIsLogin(true)}>
                      Login
                    </button>
                  </>
                )}
              </div>

              {isLogin && (
                <div className="text-center mt-2">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
