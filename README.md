# 🎓 EduTube – Smart Educational Video Finder

EduTube is a web-based educational video discovery platform that helps students find useful YouTube lectures for their study topics.

It uses the YouTube Data API to fetch real educational videos and ranks the results using a simple Smart Ranking algorithm based on views, likes, and freshness.

---

## 🎯 Objective

The main objective of EduTube is to make educational video searching easier for students by providing relevant YouTube lectures in an organized way.

Instead of manually searching through many videos, users can enter a topic and get a list of lectures ranked using our Smart Ranking system.

---

## ✨ Features

- 🔍 Search educational videos by topic
- 🎬 Real-time YouTube video results
- ⭐ Smart Ranking system
- 👀 View count display
- 👍 Like count display
- 📅 Upload date display
- ❤️ Add videos to Favorites
- ❌ Remove videos from Favorites
- 🕒 Recent Searches
- 💾 LocalStorage support
- ⏳ Loading message
- 🛡️ Error handling
- 📱 Responsive design for mobile and desktop
- ▶️ Direct Watch Video option

---

## 🧠 Smart Ranking System

EduTube uses a simple ranking algorithm to arrange the videos.

The current scoring system considers:

- Views – 50%
- Likes – 30%
- Freshness – 20%

### Formula

```text
Smart Score =
(View Score × 0.50)
+
(Like Score × 0.30)
+
(Freshness Score × 0.20)