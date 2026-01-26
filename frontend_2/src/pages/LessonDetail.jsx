import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/LessonDetail.css';

function LessonDetail() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(70);
  const [completing, setCompleting] = useState(false);
  const userId = 1; // For testing

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      const data = await api.getLessonById(lessonId);
      setLesson(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLesson = async () => {
    try {
      setCompleting(true);
      const result = await api.completeLesson(lessonId, userId, score);
      
      alert(
        `${result.message}\n\n` +
        `🌟 Số sao: ${result.stars}\n` +
        `⭐ XP nhận: +${result.xpEarned}\n` +
        `💎 Gems nhận: +${result.gemsEarned}\n` +
        `${result.isNewRecord ? '🎉 Kỷ lục mới!' : ''}`
      );
      
      navigate(-1); // Go back to lessons list
    } catch (err) {
      alert('Lỗi: ' + err.message);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;
  if (!lesson) return <div>Không tìm thấy bài học</div>;

  return (
    <div className="lesson-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <h1>📖 {lesson.lessonName}</h1>
      <p className="lesson-description">{lesson.description}</p>

      <div className="lesson-rewards">
        <span>⭐ XP: {lesson.xpReward}</span>
        <span>💎 Gems: {lesson.gemsReward}</span>
      </div>

      <h2>🔤 Ký Tự Trong Bài</h2>
      <div className="characters-grid">
        {lesson.characters && lesson.characters.map((char) => (
          <div key={char.alphabetId} className="character-card">
            <div className="character">{char.character}</div>
            <div className="meaning">{char.meaning}</div>
            <div className="type">{char.type}</div>
          </div>
        ))}
      </div>

      <div className="complete-section">
        <h2>🎯 Hoàn Thành Bài Học</h2>
        <div className="score-input">
          <label>
            Điểm số (0-100):
            <input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
            />
          </label>
        </div>
        
        <div className="stars-info">
          {score >= 90 && <span>🌟🌟🌟 3 sao (Xuất sắc!)</span>}
          {score >= 70 && score < 90 && <span>⭐⭐ 2 sao (Tốt lắm!)</span>}
          {score >= 50 && score < 70 && <span>✨ 1 sao (Cố gắng thêm!)</span>}
          {score < 50 && <span>❌ 0 sao (Cần cố gắng hơn)</span>}
        </div>

        <button 
          className="complete-btn"
          onClick={handleCompleteLesson}
          disabled={completing}
        >
          {completing ? 'Đang xử lý...' : 'Hoàn Thành Bài Học'}
        </button>
      </div>
    </div>
  );
}

export default LessonDetail;
