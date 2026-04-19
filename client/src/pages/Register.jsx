import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register({ onAuth }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/register', { name, email, password });
      localStorage.setItem('quiz-token', response.data.token);
      localStorage.setItem('quiz-user', response.data.user.name);
      onAuth({ token: response.data.token, name: response.data.user.name });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="glass-card form-card">
      <div className="hero-bar">
        <div>
          <h1>Create account</h1>
          <p>Start playing the quiz and generate certificates on pass.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {error && <div className="message-box">{error}</div>}
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} type="text" required />
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <button className="button-primary" type="submit">Register</button>
      </form>
      <p style={{ marginTop: 16, textAlign: 'center' }}>
        Already registered? <Link to="/login" className="small-link">Login</Link>
      </p>
    </div>
  );
}
