import { useState, useEffect } from 'react';
import '../styles/DailyQuest.css';

function DailyQuest({ userProgress }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Mock daily quest data (backend có model nhưng chưa có API)
  const dailyGoal = 50; // XP cần đạt mỗi ngày
  const currentXP = userProgress?.todayXP || 0;
  const progress = Math.min((currentXP / dailyGoal) * 100, 100);
  const gemsReward = 5;

  return (
    <div className={`daily-quest ${isExpanded ? 'expanded' : ''}`}>
      <div className="quest-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="quest-icon">🎯</div>
        <div className="quest-title">
          <h4>Nhiệm Vụ Hàng Ngày</h4>
          <p>{currentXP}/{dailyGoal} XP</p>
        </div>
        <div className="expand-icon">{isExpanded ? '▼' : '▶'}</div>
      </div>

      {isExpanded && (
        <div className="quest-content">
          <div className="quest-progress-bar">
            <div 
              className="quest-progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="quest-reward">
            <span>Phần thưởng: {gemsReward} 💎</span>
          </div>

          <div className="quest-list">
            <div className="quest-item">
              <input 
                type="checkbox" 
                checked={currentXP >= 10}
                readOnly
              />
              <span>Hoàn thành 1 bài học (10 XP)</span>
            </div>
            <div className="quest-item">
              <input 
                type="checkbox" 
                checked={currentXP >= 30}
                readOnly
              />
              <span>Đạt 30 XP trong ngày</span>
            </div>
            <div className="quest-item">
              <input 
                type="checkbox" 
                checked={currentXP >= 50}
                readOnly
              />
              <span>Hoàn thành mục tiêu hàng ngày (50 XP)</span>
            </div>
          </div>

          {progress >= 100 && (
            <div className="quest-completed">
              🎉 Hoàn thành! Nhận {gemsReward} 💎
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DailyQuest;
