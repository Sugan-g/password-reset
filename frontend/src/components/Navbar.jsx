import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">AuthApp</Link>

        <div className="ms-auto">
          {!token ? (
            <>
              <Link className="nav-link d-inline text-white me-3" to="/login">
                Login
              </Link>
              <Link className="nav-link d-inline text-white" to="/forgot-password">
                Forgot Password
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
