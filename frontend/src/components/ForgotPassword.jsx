import { useState } from 'react';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const res = await api.post('/api/auth/forgot-password', { email });
    setSuccess(res.data.message);
  } catch (err) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError('Something went wrong');
    }
  }
};

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-6 col-lg-4">
            <div className="card shadow-lg border-0 rounded-4 p-4">

              <h4 className="text-center fw-bold mb-3">Forgot Password</h4>

              <p className="text-center text-muted mb-4">
                Enter your registered email to receive a reset link
              </p>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              )}

              {/* SUCCESS MESSAGE */}
              {success && (
                <div className="alert alert-success text-center">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                >
                  Send Reset Link
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
