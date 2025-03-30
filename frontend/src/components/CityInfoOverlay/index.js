import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CityInfoOverlay = ({ cityData, forceOpen }) => {
  const [isOpen, setIsOpen] = useState(forceOpen || false);

  // Extract weather
  const weatherDescription =
    Array.isArray(cityData?.weather?.weather) && cityData.weather.weather.length > 0
      ? cityData.weather.weather[0].description
      : 'N/A';

  // Format traffic data
  const formatTraffic = (trafficData) => {
    const incidents = trafficData?.incidents;
    if (!Array.isArray(incidents) || incidents.length === 0) {
      return ['No traffic incidents reported'];
    }
    return incidents.slice(0, 8).map((incident, idx) => `• ${incident.fullDesc || 'Unknown incident'}`);
  };

  // Format news data
  const formatNews = (newsData) => {
    const articles = newsData?.articles;
    if (!Array.isArray(articles) || articles.length === 0) {
      return ['No news available'];
    }
    return articles.slice(0, 5).map((article, idx) => (
      <a
        key={idx}
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          color: '#4fc3f7',
          textDecoration: 'none',
          margin: '2px 0',
          fontSize: '0.85rem'
        }}
      >
        • {article.title}
      </a>
    ));
  };

  return (
    <>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen || forceOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '320px',
          background: '#1a1a1a',
          color: '#fff',
          padding: '20px',
          zIndex: 1000,
          overflowY: 'auto',
          boxShadow: '-4px 0 12px rgba(0,0,0,0.5)',
          fontFamily: 'Segoe UI, sans-serif'
        }}
      >
        <h2 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>{cityData?.name || 'City Info'}</h2>

        <section>
          <h4 style={{ marginBottom: '5px' }}>🌦 Weather</h4>
          <p style={{ margin: '4px 0' }}>{weatherDescription}</p>
        </section>

        <section style={{ marginTop: '15px' }}>
          <h4 style={{ marginBottom: '5px' }}>🚦 Traffic</h4>
          {formatTraffic(cityData?.traffic).map((incident, idx) => (
            <p key={idx} style={{ margin: '2px 0', fontSize: '0.9rem' }}>{incident}</p>
          ))}
        </section>

        <section style={{ marginTop: '15px' }}>
          <h4 style={{ marginBottom: '5px' }}>📰 News</h4>
          {formatNews(cityData?.news)}
        </section>

        <button
          onClick={() => setIsOpen(false)}
          style={{
            marginTop: '20px',
            background: '#333',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </motion.div>

      <button
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 1100,
          background: '#333',
          color: '#fff',
          border: 'none',
          padding: '8px 12px',
          cursor: 'pointer'
        }}
        onClick={() => setIsOpen(true)}
      >
        Show City Info
      </button>
    </>
  );
};

export default CityInfoOverlay;
