
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('tiny'));
// Weather Route
app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Weather data fetch failed' });
  }
});

// Traffic Route
app.get('/api/traffic', async (req, res) => {
    const lat = parseFloat(req.query.lat);
    const lon = parseFloat(req.query.lon);
    
    if (isNaN(lat) || isNaN(lon)) {
      return res.status(400).json({ error: 'Invalid latitude or longitude' });
    }
    
    const boundingBox = `${lat + 0.5},${lon - 0.5},${lat - 0.5},${lon + 0.5}`;
    console.log('Fetching traffic data with boundingBox:', boundingBox);
    
    try {
      const response = await axios.get('https://www.mapquestapi.com/traffic/v2/incidents', {
        params: {
          key: process.env.MAPQUEST_API_KEY,
          boundingBox: boundingBox,
          // Optional: specify filters (adjust as needed)
          filters: 'construction,incidents'
        }
      });
      res.json(response.data);
    } catch (error) {
      console.error(
        "Traffic API error:",
        error.response ? error.response.data : error.message
      );
      res.status(500).json({ error: 'Traffic data fetch failed' });
    }
  });
  

// News Route
app.get('/api/news', async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        q: city,
        apiKey: process.env.NEWS_API_KEY,
        pageSize: 5
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'News data fetch failed' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});