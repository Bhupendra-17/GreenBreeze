
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS for React frontend
app.use(cors());

// API keys
const aqiApiKey = '228b29504d3434826beaab2ce4f305430446d9b1';
const geoDbApiKey = '54f36ecef8msh5e1ba8c380116a1p1b24b0jsn69082316784b';


// Fetch AQI and city data (population, area)
app.get('/api/citydata', async (req, res) => {
  const city = req.query.city || 'Raipur';

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // Get AQI data
    const aqiResponse = await axios.get(`https://api.waqi.info/feed/${city}/?token=${aqiApiKey}`);
    const aqiData = aqiResponse.data;

    if (aqiData.status !== 'ok') {
      return res.status(404).json({ error: 'City not found for AQI' });
    }

    const aqi = aqiData.data.aqi;

    // Fetch population and area data using GeoDB Cities API
    const geoDbResponse = await axios.get(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}&limit=1`,
      {
        headers: {
          'x-rapidapi-key': geoDbApiKey,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );

    if (!geoDbResponse.data || geoDbResponse.data.data.length === 0) {
      return res.status(404).json({ error: 'City not found for population and area data' });
    }

    const cityData = geoDbResponse.data.data[0];
    console.log(cityData.area);
    
    const population = cityData.population || 500000; // Default if not found
    const area = cityData.area || 150; // Default area in km²

    // Calculate required plantation area (example formula)
    const requiredPlantationArea = ((aqi - 50) * population) / area;

    return res.json({
      city: cityData.name,
      aqi,
      population,
      area,
      requiredPlantationArea: requiredPlantationArea.toFixed(2), // Rounded for readability
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
