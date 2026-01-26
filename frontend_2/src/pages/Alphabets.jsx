import { useState, useEffect } from 'react';
import api from '../services/api';
import '../styles/Alphabets.css';

function Alphabets() {
  const [activeTab, setActiveTab] = useState('hiragana');
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('N5');
  const userId = 1; // For testing

  useEffect(() => {
    loadCharacters();
  }, [activeTab, selectedLevel]);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      let data;
      
      switch(activeTab) {
        case 'hiragana':
          data = await api.getHiragana();
          break;
        case 'katakana':
          data = await api.getKatakana();
          break;
        case 'kanji':
          data = await api.getKanji(selectedLevel, userId);
          break;
        default:
          data = [];
      }
      
      setCharacters(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLearnKanji = async (alphabetId) => {
    try {
      await api.learnCharacter(userId, alphabetId);
      alert('Đã học ký tự thành công!');
      loadCharacters(); // Reload to see the character
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  return (
    <div className="alphabets-container">
      <h1>🔤 Bảng Chữ Cái Tiếng Nhật</h1>
      
      <div className="tabs">
        <button 
          className={activeTab === 'hiragana' ? 'active' : ''}
          onClick={() => setActiveTab('hiragana')}
        >
          あ Hiragana
        </button>
        <button 
          className={activeTab === 'katakana' ? 'active' : ''}
          onClick={() => setActiveTab('katakana')}
        >
          ア Katakana
        </button>
        <button 
          className={activeTab === 'kanji' ? 'active' : ''}
          onClick={() => setActiveTab('kanji')}
        >
          漢 Kanji
        </button>
      </div>

      {activeTab === 'kanji' && (
        <div className="level-selector">
          {['N5', 'N4', 'N3', 'N2', 'N1'].map(level => (
            <button
              key={level}
              className={selectedLevel === level ? 'active' : ''}
              onClick={() => setSelectedLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="loading">Đang tải...</div>
      ) : error ? (
        <div className="error">Lỗi: {error}</div>
      ) : (
        <div className="characters-grid">
          {characters.map((char) => (
            <div key={char.alphabetId} className="character-card">
              <div className="character">{char.character}</div>
              <div className="meaning">{char.meaning}</div>
              {char.level && <div className="level">{char.level}</div>}
              {activeTab === 'kanji' && char.character === '?' && (
                <button 
                  className="learn-btn"
                  onClick={() => handleLearnKanji(char.alphabetId)}
                >
                  Học
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alphabets;
