import React, { useState } from 'react';
import Globe from './Globe';
import CityInfoOverlay from './components/CityInfoOverlay';
import axios from 'axios';

const App = () => {
  const [cityData, setCityData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCityClick = async (city) => {
    try {
      const [weatherRes, trafficRes, newsRes] = await Promise.all([
        axios.get(`https://smart-city-globe-api.onrender.com/api/weather?lat=${city.lat}&lon=${city.lon}`),
        axios.get(`https://smart-city-globe-api.onrender.com/api/traffic?lat=${city.lat}&lon=${city.lon}`),
        axios.get(`https://smart-city-globe-api.onrender.com/api/news?city=${city.name}`)
      ]);

      setCityData({
        name: city.name,
        weather: weatherRes.data.weather || [],
        traffic: (trafficRes.data.incidents || []).map(i =>
          i.fullDesc || i.shortDesc || 'Traffic alert'
        ),
        news: (newsRes.data.articles || []).map(a => ({
          title: a.title,
          url: a.url
        }))
      });

      setIsSidebarOpen(true); // open the sidebar
    } catch (error) {
      console.error('❌ Error fetching city data:', error);
    }
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <Globe onCityClick={handleCityClick} />
      {cityData && (
        <CityInfoOverlay
          cityData={cityData}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />
      )}
    </div>
  );
};

export default App;
