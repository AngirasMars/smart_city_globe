import React from 'react';
import { motion } from 'framer-motion';

const CityInfoOverlay = ({ cityData, isOpen, onClose }) => {
  const weatherDescription =
    Array.isArray(cityData?.weather) && cityData.weather.length > 0
      ? cityData.weather[0].description
      : 'N/A';

  return (
    <>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '300px',
          background: '#111',
          color: '#fff',
          padding: '20px',
          zIndex: 1000,
          overflowY: 'auto'
        }}
      >
        <h2>{cityData?.name}</h2>

        <p><strong>🌦 Weather:</strong> {weatherDescription}</p>

        <p><strong>🚦 Traffic:</strong></p>
        <ul>
        {(() => {
          const traffic = cityData?.traffic || [];
          const filtered = traffic.filter((item) => !/closed/i.test(item));
          return filtered.length > 0
          ? filtered.slice(0, 5).map((item, idx) => <li key={idx}>{item}</li>)
          : <li>No data available</li>;
        })()}
        </ul>

        <p><strong>📰 News:</strong></p>
        <ul>
          {cityData.news?.length > 0 ? (
            cityData.news.map((a, idx) => (
              <li key={idx}>
                <a
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'skyblue' }}
                >
                  {a.title}
                </a>
              </li>
            ))
          ) : (
            <li>No news available</li>
          )}
        </ul>

        <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
      </motion.div>
    </>
  );
};

export default CityInfoOverlay;
