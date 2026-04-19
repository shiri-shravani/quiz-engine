import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Login({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('quiz-token', response.data.token);
      localStorage.setItem('quiz-user', response.data.user.name);
      onAuth({ token: response.data.token, name: response.data.user.name });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="glass-card form-card">
      <div className="hero-bar">
        <div>
          <h1>Automated Quiz Engine</h1>
          <p>Login to access the quiz dashboard and earn certificates.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {error && <div className="message-box">{error}</div>}
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <button className="button-primary" type="submit">Login</button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        Don&apos;t have an account? <Link to="/register" className="small-link">Register</Link>
      </p>
    </div>
  );
}
