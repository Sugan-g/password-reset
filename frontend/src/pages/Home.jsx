import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await api.post('/api/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        alert('Login successful');
        navigate('/dashboard'); // redirect after login
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

        {/* Card */}
        <div className="col-12 col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body p-4">

              <h4 className="text-center mb-3">
                {isLogin ? 'Login' : 'Register'}
              </h4>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />

                <button
                  type="submit"
                  className={`btn ${isLogin ? 'btn-success' : 'btn-primary'} w-100`}
                  disabled={loading}
                >
                  {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
                </button>
              </form>

              <div className="text-center mt-3">
                {isLogin ? (
                  <>
                    <span>Don’t have an account? </span>
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => setIsLogin(false)}
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    <span>Already have an account? </span>
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={() => setIsLogin(true)}
                    >
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
