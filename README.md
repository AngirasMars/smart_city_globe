# 🌐 Smart City Globe

An interactive 3D globe built with React and Three.js that lets users explore major cities around the world and view real-time **weather**, **traffic conditions**, and **news headlines** for each location.

---

## 🚀 Live Demo
[View the App](https://smart-city-globe.vercel.app)

## 🧰 Tech Stack
- **Frontend**: React, Three.js, @react-three/fiber, Framer Motion
- **Backend**: Node.js, Express
- **APIs**: OpenWeatherMap, MapQuest, NewsAPI
- **Deployment**: Vercel (frontend), Render (backend)

---

## 📦 Setup Instructions

### 1. Clone the repo:
```bash
git clone https://github.com/your-username/smart_city_globe.git
```

### 2. Install dependencies:
```bash
cd frontend
npm install

cd ../backend
npm install
```

### 3. Add environment variables:
Create a `.env` file in the `/backend` folder and add:
```env
OPENWEATHER_API_KEY=your_key_here
MAPQUEST_API_KEY=your_key_here
NEWS_API_KEY=your_key_here
```

### 4. Run the servers:
```bash
# In /backend
npm run dev

# In /frontend
npm start
```

---

## 📱 Features
- 🗺️ Interactive 3D Globe with City Markers
- ☁️ Real-Time Weather Info
- 🚦 Traffic Updates (limited to available API data)
- 📰 Top News Headlines
- 💻 Fully responsive on desktop (mobile support limited)

---

## 📸 Screenshots
*(Add a few images or GIFs to showcase your app here)*

---

## 🧠 What I Learned
This project helped me deepen my understanding of:
- API integration and error handling
- React + Three.js interactions
- Responsive UI design
- Hosting and deployment strategies

---

## 📅 Upcoming Improvements
- Improve mobile responsiveness
- Add better error fallback messages
- Enhance city label rendering logic

---

## 📄 License
MIT License

---

Built with passion by [Your Name]
