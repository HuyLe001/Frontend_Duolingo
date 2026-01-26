import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import DailyQuest from '../components/DailyQuest';
import '../styles/Topics.css';

function Topics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState(null);
  const navigate = useNavigate();
  const userId = 1;

  useEffect(() => {
    loadTopics();
    loadUserProgress();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await api.getAllTopics(userId);
      setTopics(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    try {
      const data = await api.getUserProgress(userId);
      setUserProgress(data);
    } catch (err) {
      console.error('Load progress error:', err);
    }
  };

  const handleTopicClick = (topicId) => {
    navigate(`/lessons/${topicId}`);
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">Lỗi: {error}</div>;

  return (
    <div className="topics-page">
      <DailyQuest userProgress={userProgress} />
      
      <div className="topics-container">
        <h1>📚 Chọn Chủ Đề Học Tập</h1>
        <p className="topics-subtitle">Bắt đầu hành trình chinh phục tiếng Nhật của bạn!</p>
        
        <div className="topics-grid">
          {topics.map((topic) => (
            <div 
              key={topic.topicId} 
              className="topic-card"
              onClick={() => handleTopicClick(topic.topicId)}
            >
              <div className="topic-icon">{topic.iconUrl || '📖'}</div>
              <h3>{topic.topicName}</h3>
              <p>{topic.description}</p>
              <div className="topic-stats">
                <span>📝 {topic.totalLessons} bài</span>
                <span>✅ {topic.completedLessons}/{topic.totalLessons}</span>
              </div>
              <div className="topic-progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${topic.progressPercentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Topics;
