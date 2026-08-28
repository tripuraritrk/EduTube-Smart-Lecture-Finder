# 🎓 EduTube – Smart Educational Video Finder

EduTube is a web application designed to make it easier to discover useful educational lectures on YouTube.

Users can search for a topic and get relevant videos along with useful information such as views, likes, upload date, and a Smart Score.

## ✨ Features

- 🔍 Topic-based YouTube search
- 🎬 Real-time video results
- 🧠 Smart ranking based on views, likes, and freshness
- 👀 View count
- 👍 Like count
- 📅 Upload date
- ❤️ Favorites
- 🕒 Recent Searches
- 💾 LocalStorage support
- ▶️ Direct YouTube watch option
- 📱 Responsive design
- ⏳ Loading and error handling

## 🧠 Smart Ranking

EduTube ranks the fetched videos using a simple scoring system based on:

- Views – 50%
- Likes – 30%
- Freshness – 20%

```text
Smart Score =
(View Score × 0.50)
+
(Like Score × 0.30)
+
(Freshness Score × 0.20)