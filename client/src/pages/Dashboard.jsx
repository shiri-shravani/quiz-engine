import { useNavigate } from 'react-router-dom';

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="glass-card">
      <div className="hero-bar">
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Ready to test your knowledge and earn a certificate?</p>
        </div>
        <button onClick={onLogout}>Logout</button>
      </div>
      <div className="banner-card" style={{ marginBottom: 20, background: '#113662' }}>
        <h2 style={{ margin: 0 }}>Quiz Dashboard</h2>
        <p style={{ margin: '12px 0' }}>Press start to open the MCQ quiz and review your scores.</p>
        <button className="start-button" onClick={() => navigate('/quiz')}>Play Quiz</button>
      </div>
      <div className="banner">
        <div className="banner-card pass">
          <h3>Your Scores</h3>
          <p style={{ fontSize: 32, fontWeight: 700, margin: '12px 0' }}>Passed: 85%</p>
          <p style={{ color: '#cbd7f5' }}>Complete the quiz to see your exact result.</p>
        </div>
        <div className="banner-card fail">
          <h3>Your Scores</h3>
          <p style={{ fontSize: 32, fontWeight: 700, margin: '12px 0' }}>Failed: 15%</p>
          <p style={{ color: '#f4c2c2' }}>If needed, retake the quiz until you pass.</p>
        </div>
      </div>
    </div>
  );
}
