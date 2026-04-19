import { useLocation, useNavigate } from 'react-router-dom';

export default function Result({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { attempt, certificate } = location.state || {};

  if (!attempt) {
    return (
      <div className="glass-card">
        <div className="message-box">No result available. Please take the quiz first.</div>
        <button className="button-secondary" onClick={() => navigate('/quiz')}>Go to Quiz</button>
      </div>
    );
  }

  const passed = attempt.passed;

  return (
    <div className="glass-card">
      <div className={`status-card ${passed ? 'pass' : 'fail'}`}>
        <h2>{passed ? 'Quiz Passed' : 'Quiz Failed'}</h2>
        <p>{passed ? 'Congratulations! You have passed the quiz.' : 'Sorry, you did not pass the quiz. Try again!'}</p>
        <p style={{ fontSize: 24, fontWeight: 700, margin: '18px 0' }}>Score: {attempt.score}%</p>
        {passed ? (
          <button className="download-button" onClick={() => navigate(`/certificate/${certificate.certificateId}`)}>
            Download Certificate
          </button>
        ) : (
          <button className="retry-button" onClick={() => navigate('/quiz')}>
            Retake Quiz
          </button>
        )}
      </div>
    </div>
  );
}
