import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid or expired link');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h4 className="text-center mb-4">Reset Password</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="text-center">
                <button className="btn btn-success px-4">
                  Reset Password
                </button>
              </div>
            </form>

            {message && (
              <p className="mt-3 text-center text-success">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
