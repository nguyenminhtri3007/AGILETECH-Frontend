import './application.component.scss';
import * as AuthService from "../data/services/auth.service";
import { AuthModel } from '../data/models/auth.model';
import { ErrorModel } from '../common/model/error.model';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ApplicationComponentProps {
  onLoginSuccess?: () => void;
}

const ApplicationComponent = ({ onLoginSuccess }: ApplicationComponentProps) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    setError("");
    setLoading(true);
    try {
      const model = new AuthModel(username);
      await AuthService.signIn(model);
      if (onLoginSuccess) onLoginSuccess();
      navigate('/');
    } catch (err) {
      if (err instanceof ErrorModel) {
        setError(err.message || "Đăng nhập thất bại");
      } else {
        setError("Đăng nhập thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
      </div>
      <form className="login-form" onSubmit={e => { e.preventDefault(); signIn(); }}>
        <h1 className="login-title">Sign In</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default ApplicationComponent;
