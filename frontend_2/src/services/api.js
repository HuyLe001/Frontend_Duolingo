// Base API URL
const API_BASE_URL = 'http://localhost:5208/api';

// API Service for communicating with backend
class ApiService {
  // Topics
  async getAllTopics(userId = null) {
    const url = userId ? `${API_BASE_URL}/topics?userId=${userId}` : `${API_BASE_URL}/topics`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch topics');
    return response.json();
  }

  async getTopicById(id) {
    const response = await fetch(`${API_BASE_URL}/topics/${id}`);
    if (!response.ok) throw new Error('Failed to fetch topic');
    return response.json();
  }

  // Alphabets
  async getHiragana() {
    const response = await fetch(`${API_BASE_URL}/alphabets/hiragana`);
    if (!response.ok) throw new Error('Failed to fetch hiragana');
    return response.json();
  }

  async getKatakana() {
    const response = await fetch(`${API_BASE_URL}/alphabets/katakana`);
    if (!response.ok) throw new Error('Failed to fetch katakana');
    return response.json();
  }

  async getKanji(level, userId) {
    const response = await fetch(`${API_BASE_URL}/alphabets/kanji?level=${level}&userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch kanji');
    return response.json();
  }

  // Lessons
  async getLessonsByTopic(topicId, userId) {
    const response = await fetch(`${API_BASE_URL}/lessons/topic/${topicId}?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch lessons');
    return response.json();
  }

  async getLessonById(id) {
    const response = await fetch(`${API_BASE_URL}/lessons/${id}`);
    if (!response.ok) throw new Error('Failed to fetch lesson');
    return response.json();
  }

  async completeLesson(lessonId, userId, score) {
    const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, userId, score })
    });
    if (!response.ok) throw new Error('Failed to complete lesson');
    return response.json();
  }

  // Progress
  async learnCharacter(userId, alphabetId) {
    const response = await fetch(`${API_BASE_URL}/progress/learn-character`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, alphabetId })
    });
    if (!response.ok) throw new Error('Failed to learn character');
    return response.json();
  }

  async completeLessonProgress(userId, lessonId, score) {
    const response = await fetch(`${API_BASE_URL}/progress/complete-lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, lessonId, score })
    });
    if (!response.ok) throw new Error('Failed to complete lesson');
    return response.json();
  }

  async getUserProgress(userId) {
    const response = await fetch(`${API_BASE_URL}/progress/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user progress');
    return response.json();
  }
}

export default new ApiService();
