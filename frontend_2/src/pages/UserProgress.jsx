import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/UserProgress.css';

function UserProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = 1; // For testing

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const data = await api.getUserProgress(userId);
      setProgress(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;
  if (!progress) return <div>Không có dữ liệu</div>;

  return (
    <div className="progress-container">
      <h1>👤 Tiến Độ Học Tập</h1>

      <div className="user-info">
        <h2>👋 Xin chào, {progress.username}!</h2>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{progress.totalXp}</div>
          <div className="stat-label">Tổng XP</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💎</div>
          <div className="stat-value">{progress.gems}</div>
          <div className="stat-label">Gems</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{progress.streakCount}</div>
          <div className="stat-label">Streak</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">漢</div>
          <div className="stat-value">{progress.totalKanjiLearned}</div>
          <div className="stat-label">Kanji đã học</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔤</div>
          <div className="stat-value">{progress.totalCharactersLearned}</div>
          <div className="stat-label">Tổng ký tự</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-value">
            {progress.lastLearnedDate 
              ? new Date(progress.lastLearnedDate).toLocaleDateString('vi-VN')
              : 'Chưa học'}
          </div>
          <div className="stat-label">Học lần cuối</div>
        </div>
      </div>

      <div className="recently-learned">
        <h2>📚 Ký Tự Học Gần Đây</h2>
        {progress.recentlyLearned && progress.recentlyLearned.length > 0 ? (
          <div className="learned-grid">
            {progress.recentlyLearned.map((char) => (
              <div key={char.alphabetId} className="learned-card">
                <div className="character">{char.character}</div>
                <div className="meaning">{char.meaning}</div>
                <div className="info">
                  <span className="type">{char.type}</span>
                  {char.level && <span className="level">{char.level}</span>}
                </div>
                <div className="date">
                  {new Date(char.learnedDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">Chưa có ký tự nào được học</p>
        )}
      </div>

      <button className="refresh-btn" onClick={loadProgress}>
        🔄 Làm mới
      </button>
    </div>
  );
}

export default UserProgress;
