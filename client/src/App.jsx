import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      let endpoint = 'http://localhost:5000/api/login';
      let payload = { email, password };

      if (!isLogin && !isReset) {
        endpoint = 'http://localhost:5000/api/register';
        payload = { name, email, password };
      } else if (isReset) {
        endpoint = 'http://localhost:5000/api/reset-password';
        payload = { email, newPassword: password };
      }

      const response = await axios.post(endpoint, payload);
      setMessage(response.data.message);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.error || "An error occurred connecting to server.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>AI'll Remember 🧠</h1>
        <p>Learn. Remember. Level Up.</p>
      </div>

      <div className="auth-title">
        {isReset ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && !isReset && (
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              className="input-field"
              placeholder="John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <input 
            type="email" 
            className="input-field"
            placeholder="student@cit.edu" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label>{isReset ? "New Password" : "Password"}</label>
          <input 
            type="password" 
            className="input-field"
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">
          {isReset ? 'Reset Password' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      {message && (
        <div className={`message-box ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="auth-footer">
        {!isReset ? (
          <>
            <span className="auth-link" onClick={() => { setIsLogin(!isLogin); setMessage(''); }}>
              {isLogin ? "Need an account? Register" : "Have an account? Login"}
            </span>
            <span className="auth-link" style={{ color: '#94a3b8' }} onClick={() => { setIsReset(true); setMessage(''); }}>
              Forgot Password?
            </span>
          </>
        ) : (
          <span className="auth-link" onClick={() => { setIsReset(false); setIsLogin(true); setMessage(''); }}>
            ← Back to Login
          </span>
        )}
      </div>
    </div>
  );
}

export default App;