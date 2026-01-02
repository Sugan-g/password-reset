import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">AuthApp</Link>

        <div className="ms-auto">
          <Link className="nav-link d-inline text-white me-3" to="/">
            Home
          </Link>
          <Link className="nav-link d-inline text-white me-3" to="/forgot-password">
            Forgot Password
          </Link>
        </div>
      </div>
    </nav>
  );
}
