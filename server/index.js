const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS for React frontend
app.use(cors());

// API key for API Ninjas (replace with your actual key)
const apiNinjasKey = 'wA2BK5aBRbeTckHTpzdiQQ==JetrAUBbEOVmaZNt';

// Fetch AQI and city data (population)
app.get('/api/citydata', async (req, res) => {
  const city = req.query.city || 'Raipur';

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // Log the city being queried
    console.log('Fetching AQI data for city:', city);

    // Get AQI data using API Ninjas
    const aqiResponse = await axios.get(`https://api.api-ninjas.com/v1/airquality?city=${city}`, {
      headers: {
        'X-Api-Key': apiNinjasKey,
      },
    });

    console.log('AQI Response:', aqiResponse.data);

    if (!aqiResponse.data || aqiResponse.data.length === 0) {
      return res.status(404).json({ error: 'City not found for AQI' });
    }

    const aqiData = aqiResponse.data[0];
    const aqi = aqiData.aqi;

    // Fetch population data using API Ninjas
    const ninjaResponse = await axios.get(`https://api.api-ninjas.com/v1/city?name=${city}`, {
      headers: {
        'X-Api-Key': apiNinjasKey,
      },
    });

    console.log('City Population Response:', ninjaResponse.data);

    if (!ninjaResponse.data || ninjaResponse.data.length === 0) {
      return res.status(404).json({ error: 'City not found for population data' });
    }

    const cityData = ninjaResponse.data[0];
    const population = cityData.population || 500000; // Default population if not found
    const area = 150; // Default area in km²

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
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
