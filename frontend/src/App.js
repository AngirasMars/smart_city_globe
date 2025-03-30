import React, { useState } from 'react';
import Globe from './Globe';
import CityInfoOverlay from './components/CityInfoOverlay';
import axios from 'axios';

const App = () => {
  const [cityData, setCityData] = useState(null);

  const handleCityClick = async (city) => {
    try {
      const [weatherRes, trafficRes, newsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/weather?lat=${city.lat}&lon=${city.lon}`),
        axios.get(`http://localhost:5000/api/traffic?lat=${city.lat}&lon=${city.lon}`),
        axios.get(`http://localhost:5000/api/news?city=${city.name}`)
      ]);

      // Pass entire response structure
      setCityData({
        name: city.name,
        weather: weatherRes.data,
        traffic: trafficRes.data,
        news: newsRes.data
      });

    } catch (error) {
      console.error('❌ Error fetching city data:', error);
    }
  };

  return (
    <div>
      <Globe onCityClick={handleCityClick} />
      {cityData && <CityInfoOverlay cityData={cityData} forceOpen={true} />}
    </div>
  );
};

export default App;
