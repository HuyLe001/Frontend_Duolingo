import { useState } from 'react'
import './App.css'
import Learning from './components/Learning'
import Practice from './components/Practice'
import Leaderboard from './components/Leaderboard'
import Shop from './components/Shop'

function App() {
  const [currentTab, setCurrentTab] = useState('learning')
  const [streak, setStreak] = useState(7)
  const [xp, setXp] = useState(1250)

  const renderContent = () => {
    switch(currentTab) {
      case 'learning':
        return <Learning />
      case 'practice':
        return <Practice />
      case 'leaderboard':
        return <Leaderboard />
      case 'shop':
        return <Shop />
      default:
        return <Learning />
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">🦉</span>
            <span className="logo-text">Học tiếng Nhật</span>
          </div>
        </div>
        <div className="header-center">
          <nav className="nav">
            <button 
              className={`nav-btn ${currentTab === 'learning' ? 'active' : ''}`}
              onClick={() => setCurrentTab('learning')}
            >
              Học tập
            </button>
            <button 
              className={`nav-btn ${currentTab === 'practice' ? 'active' : ''}`}
              onClick={() => setCurrentTab('practice')}
            >
              Thực hành
            </button>
            <button 
              className={`nav-btn ${currentTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => setCurrentTab('leaderboard')}
            >
              Bảng xếp hạng
            </button>
            <button 
              className={`nav-btn ${currentTab === 'shop' ? 'active' : ''}`}
              onClick={() => setCurrentTab('shop')}
            >
              Cửa hàng
            </button>
          </nav>
        </div>
        <div className="header-right">
          <div className="streak">
            <span className="streak-icon">🔥</span>
            <span className="streak-count">{streak}</span>
          </div>
          <div className="xp">
            <span className="xp-icon">⭐</span>
            <span className="xp-count">{xp}</span>
          </div>
          <div className="profile">
            <div className="profile-avatar">👤</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
