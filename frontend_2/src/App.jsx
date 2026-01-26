import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Topics from './pages/Topics';
import Alphabets from './pages/Alphabets';
import Lessons from './pages/Lessons';
import LessonDetail from './pages/LessonDetail';
import UserProgress from './pages/UserProgress';
import Shop from './pages/Shop';
import api from './services/api';
import './App.css';

function App() {
  const [userStats, setUserStats] = useState(null);
  const userId = 1;

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      const stats = await api.getUserProgress(userId);
      setUserStats(stats);
    } catch (err) {
      console.error('Load stats error:', err);
    }
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/topics">🗾 Nihongo Learning</Link>
          </div>
          
          <div className="nav-center">
            <div className="nav-links">
              <Link to="/topics" className="nav-link">
                <span className="nav-icon">📚</span>
                <span>Chủ Đề</span>
              </Link>
              <Link to="/alphabets" className="nav-link">
                <span className="nav-icon">🔤</span>
                <span>Bảng Chữ</span>
              </Link>
              <Link to="/shop" className="nav-link">
                <span className="nav-icon">🏪</span>
                <span>Cửa Hàng</span>
              </Link>
              <Link to="/progress" className="nav-link">
                <span className="nav-icon">📊</span>
                <span>Tiến Độ</span>
              </Link>
            </div>
          </div>

          <div className="nav-stats">
            <div className="stat-item streak">
              <span className="stat-icon">🔥</span>
              <span className="stat-value">{userStats?.streakCount || 0}</span>
            </div>
            <div className="stat-item gems">
              <span className="stat-icon">💎</span>
              <span className="stat-value">{userStats?.gems || 0}</span>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Topics />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/alphabets" element={<Alphabets />} />
            <Route path="/lessons/:topicId" element={<Lessons />} />
            <Route path="/lesson/:lessonId" element={<LessonDetail />} />
            <Route path="/progress" element={<UserProgress />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
