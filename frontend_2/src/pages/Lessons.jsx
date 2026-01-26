import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Lessons.css';

function Lessons() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = 1; // For testing

  useEffect(() => {
    loadLessons();
  }, [topicId]);

  const loadLessons = async () => {
    try {
      setLoading(true);
      const data = await api.getLessonsByTopic(topicId, userId);
      setLessons(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonClick = (lessonId, isLocked) => {
    if (isLocked) {
      alert('Bài học này đang bị khóa! Hoàn thành bài trước đó để mở khóa.');
      return;
    }
    navigate(`/lesson/${lessonId}`);
  };

  const getLessonIcon = (lesson, index) => {
    if (lesson.isCompleted) return '👑'; // Crown for completed
    if (lesson.isLocked) return '🔒';
    return index % 3 === 0 ? '📚' : index % 3 === 1 ? '📖' : '✏️';
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;

  return (
    <div className="lessons-container">
      <button className="back-btn" onClick={() => navigate('/topics')}>
        ← Quay lại
      </button>
      
      <div className="lessons-header">
        <h1>Learning Path</h1>
        <div className="progress-summary">
          {lessons.filter(l => l.isCompleted).length} / {lessons.length} hoàn thành
        </div>
      </div>
      
      <div className="lessons-path">
        <div className="path-line"></div>
        {lessons.map((lesson, index) => (
          <div 
            key={lesson.lessonId}
            className={`lesson-node ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div 
              className={`lesson-circle ${lesson.isLocked ? 'locked' : ''} ${lesson.isCompleted ? 'completed' : ''}`}
              onClick={() => handleLessonClick(lesson.lessonId, lesson.isLocked)}
            >
              <div className="lesson-icon">{getLessonIcon(lesson, index)}</div>
              {lesson.isCompleted && lesson.stars && (
                <div className="stars-badge">
                  {'⭐'.repeat(lesson.stars)}
                </div>
              )}
              {!lesson.isLocked && !lesson.isCompleted && (
                <div className="pulse-ring"></div>
              )}
            </div>
            
            <div className="lesson-info-card">
              <h3>{lesson.lessonName}</h3>
              <p>{lesson.description}</p>
              <div className="lesson-rewards">
                <span className="reward">+{lesson.xpReward} XP</span>
                <span className="reward gems">+{lesson.gemsReward} 💎</span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="path-end">
          <div className="trophy-circle">🏆</div>
          <p>Hoàn thành chủ đề!</p>
        </div>
      </div>
    </div>
  );
}

export default Lessons;
