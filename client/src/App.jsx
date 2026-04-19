import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Certificate from './pages/Certificate';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('quiz-token');
    const name = localStorage.getItem('quiz-user');
    if (token && name) {
      setUser({ name, token });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('quiz-token');
    localStorage.removeItem('quiz-user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<Login onAuth={setUser} />} />
        <Route path="/register" element={<Register onAuth={setUser} />} />
        <Route path="/" element={<ProtectedRoute user={user}><Dashboard user={user} onLogout={handleLogout} /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute user={user}><Quiz user={user} /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute user={user}><Result user={user} /></ProtectedRoute>} />
        <Route path="/certificate/:certificateId" element={<ProtectedRoute user={user}><Certificate user={user} /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
