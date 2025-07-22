import './application.component.scss';
import { useState } from 'react';


interface ApplicationComponentProps {
  onLoginSuccess?: () => void;
}

const ApplicationComponent = ({ onLoginSuccess }: ApplicationComponentProps) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const signIn = async () => {

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
