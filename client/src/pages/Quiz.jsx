import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Quiz({ user }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/questions');
        setQuestions(response.data);
      } catch (err) {
        setError('Unable to load quiz questions.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const setAnswer = (questionId, selectedIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedIndex }));
  };

  const submitQuiz = async () => {
    const answerPayload = questions.map(question => ({
      questionId: question._id,
      selectedIndex: answers[question._id] ?? -1,
    }));

    try {
      const response = await api.post('/attempts', { answers: answerPayload });
      navigate('/result', { state: { attempt: response.data.attempt, certificate: response.data.certificate } });
    } catch (err) {
      setError('Could not submit quiz. Please try again.');
    }
  };

  if (loading) return <div className="glass-card">Loading quiz...</div>;
  if (error) return <div className="glass-card"><div className="message-box">{error}</div></div>;

  return (
    <div className="glass-card">
      <div className="hero-bar">
        <div>
          <h1>Quiz In Progress</h1>
          <p>Answer each question and submit to get your result.</p>
        </div>
      </div>
      <div className="question-list">
        {questions.map((question, index) => (
          <div key={question._id} className="question-item">
            <h3>Question {index + 1}: {question.text}</h3>
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="option-row">
                <input
                  type="radio"
                  name={question._id}
                  checked={answers[question._id] === optionIndex}
                  onChange={() => setAnswer(question._id, optionIndex)}
                />
                {String.fromCharCode(65 + optionIndex)}) {option}
              </label>
            ))}
          </div>
        ))}
      </div>
      <button className="button-primary" onClick={submitQuiz}>Submit Answer</button>
    </div>
  );
}
