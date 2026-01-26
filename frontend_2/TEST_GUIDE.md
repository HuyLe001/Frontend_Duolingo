# 🗾 Nihongo Learning - Frontend Testing Interface

## 📋 Tổng Quan
Frontend này được tạo để test các chức năng của backend API Nihongo Learning. Tất cả các endpoint đã được tích hợp và có giao diện thân thiện.

## 🚀 Hướng Dẫn Chạy

### 1. Chạy Backend (Trong terminal 1)
```powershell
cd d:\Backend_SWD\Frontend_Review\NihongoLearning\NihongoLearning
dotnet run
```
Backend sẽ chạy tại: http://localhost:5208

### 2. Chạy Frontend (Trong terminal 2)
```powershell
cd d:\Backend_SWD\Frontend_Review\frontend
npm run dev
```
Frontend sẽ chạy tại: http://localhost:5173

## 🎯 Các Trang & Chức Năng

### 1. 📚 Topics (Chủ Đề)
- **Route:** `/topics` hoặc `/`
- **API:** `GET /api/topics`
- **Chức năng:**
  - Xem danh sách các chủ đề
  - Click vào chủ đề để xem danh sách bài học
  - Hiển thị số lượng bài học và tiến độ

### 2. 🔤 Alphabets (Bảng Chữ Cái)
- **Route:** `/alphabets`
- **APIs:**
  - `GET /api/alphabets/hiragana` - Xem Hiragana
  - `GET /api/alphabets/katakana` - Xem Katakana
  - `GET /api/alphabets/kanji?level=N5&userId=1` - Xem Kanji theo level
  - `POST /api/progress/learn-character` - Học Kanji (unlock ký tự)
- **Chức năng:**
  - Tab để chuyển giữa Hiragana, Katakana, Kanji
  - Chọn level N5-N1 cho Kanji
  - Click "Học" để unlock Kanji (hiện dấu ?)
  - **Test Case:** Kanji chưa học sẽ hiện "?", click "Học" để unlock

### 3. 📝 Lessons (Bài Học)
- **Route:** `/lessons/:topicId`
- **APIs:**
  - `GET /api/lessons/topic/{topicId}?userId=1` - Danh sách bài học
- **Chức năng:**
  - Xem danh sách bài học trong 1 chủ đề
  - Hiển thị trạng thái: Locked 🔒, Completed ✅
  - Click vào bài để xem chi tiết
  - **Test Case:** Bài đầu tiên mở, các bài khác khóa cho đến khi hoàn thành bài trước

### 4. 📖 Lesson Detail (Chi Tiết Bài Học)
- **Route:** `/lesson/:lessonId`
- **APIs:**
  - `GET /api/lessons/{id}` - Chi tiết bài học
  - `POST /api/lessons/{id}/complete` - Hoàn thành bài học
- **Chức năng:**
  - Xem các ký tự trong bài
  - Nhập điểm số (0-100) để test
  - Click "Hoàn Thành Bài Học"
  - **Test Cases:**
    - Điểm ≥90: 3 sao + bonus XP/Gems
    - Điểm ≥70: 2 sao + bonus nhỏ
    - Điểm ≥50: 1 sao
    - Điểm <50: 0 sao
    - Làm lại bài: chỉ cập nhật nếu điểm cao hơn

### 5. 👤 User Progress (Tiến Độ)
- **Route:** `/progress`
- **API:** `GET /api/progress/user/{userId}`
- **Chức năng:**
  - Xem tổng XP, Gems, Streak
  - Xem số Kanji đã học
  - Xem 10 ký tự học gần đây
  - Click "🔄 Làm mới" để cập nhật

## 🧪 Kịch Bản Test Đầy Đủ

### Test 1: Flow Học Cơ Bản
1. Vào `/topics` → chọn 1 chủ đề
2. Vào `/lessons/{topicId}` → chọn bài đầu tiên (không khóa)
3. Vào `/lesson/{lessonId}` → nhập điểm 95 → hoàn thành
4. Quay lại danh sách bài → bài đầu có ✅, bài 2 đã mở khóa
5. Vào `/progress` → xem XP/Gems đã tăng

### Test 2: Học Kanji
1. Vào `/alphabets` → tab Kanji → chọn N5
2. Thấy các Kanji hiện "?" (chưa học)
3. Click "Học" trên 1 Kanji
4. Kanji đó hiện ký tự thật
5. Vào `/progress` → xem "Ký Tự Học Gần Đây"

### Test 3: Điểm Số & Sao
1. Vào 1 bài học
2. Test với điểm 95 → nhận 3 sao
3. Làm lại với điểm 60 → không cập nhật (điểm cũ cao hơn)
4. Làm lại với điểm 98 → cập nhật lên 3 sao với điểm mới

### Test 4: Streak Bonus (Test từ Backend)
- Học 2 bài trong cùng ngày → nhận bonus XP
- Học liên tục nhiều ngày → streak tăng, bonus tăng
- Nghỉ 1 ngày → streak reset

## 📊 Thông Tin Test
- **User ID mặc định:** 1 (hardcode để test)
- **Backend URL:** http://localhost:5208
- **Dữ liệu:** Backend cần có data mẫu (Topics, Lessons, Alphabets)

## 🔧 Cấu Trúc Project

```
frontend/
├── src/
│   ├── pages/              # Các trang chính
│   │   ├── Topics.jsx      # Danh sách chủ đề
│   │   ├── Alphabets.jsx   # Hiragana/Katakana/Kanji
│   │   ├── Lessons.jsx     # Danh sách bài học
│   │   ├── LessonDetail.jsx # Chi tiết bài học
│   │   └── UserProgress.jsx # Tiến độ user
│   ├── services/
│   │   └── api.js          # API service
│   ├── styles/             # CSS cho từng trang
│   ├── App.jsx             # Router chính
│   └── main.jsx            # Entry point
```

## 🎨 Tính Năng UI
- Responsive design
- Loading states
- Error handling
- Gradient buttons & cards
- Icons emoji cho dễ nhìn
- Locked/unlocked lessons
- Star rating system
- Progress bars

## 📝 Lưu Ý
- Backend phải chạy trước khi test frontend
- Tất cả API calls đều dùng userId = 1 (có thể thay đổi trong code)
- CORS cần được enable ở backend (thường có sẵn trong development)
- Nếu API lỗi, kiểm tra backend đang chạy và URL đúng

## 🐛 Troubleshooting

### Backend không kết nối được
- Kiểm tra backend đang chạy: http://localhost:5208
- Test trực tiếp: http://localhost:5208/api/topics
- Kiểm tra CORS policy trong Program.cs

### Frontend không hiển thị dữ liệu
- Mở DevTools Console xem lỗi
- Kiểm tra Network tab xem API responses
- Đảm bảo backend có data mẫu

### Kanji không unlock
- Kiểm tra userId đúng
- Xem response từ API learn-character
- Refresh lại trang sau khi học

---

✅ **Frontend đã sẵn sàng để test!** Chúc bạn test tốt! 🚀
