import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]); // 🔥 re-check on every route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">AuthApp</Link>

        <div className="ms-auto">
          {!isLoggedIn ? (
            <>
              <Link className="nav-link d-inline text-white me-3" to="/">
                Home
              </Link>
              <Link className="nav-link d-inline text-white me-3" to="/forgot-password">
                Forgot Password
              </Link>
            </>
          ) : (
            <button
              className="btn btn-outline-light"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
