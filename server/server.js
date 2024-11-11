const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();

// Enable CORS for React frontend
app.use(cors({ origin: ['https://greenbreeze.vercel.app','https://greenbreeze.vercel.app/home' ] }));

// API keys
const aqiApiKey = '228b29504d3434826beaab2ce4f305430446d9b1';

// Load the CSV data into an object for quick lookups
const cityDataMap = new Map();

fs.createReadStream('./data.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Assuming the CSV has columns 'City', 'Population', 'Area'
    const cityName = row.City.toLowerCase();
    cityDataMap.set(cityName, {
      population: parseInt(row.Population, 10),
      area: parseFloat(row.Area),
    });
  })
  .on('end', () => {
    console.log('CSV file successfully processed and data loaded.');
  });

// Fetch AQI and city data (population, area)
app.get('/api/citydata', async (req, res) => {
  const city = req.query.city ? req.query.city.toLowerCase() : 'raipur';
  const targetAQI = parseInt(req.query.targetAQI, 10) || 50; // Default target AQI

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  // Get population and area from CSV data
  const cityData = cityDataMap.get(city);
  if (!cityData) {
    return res.status(404).json({ error: 'City not found in local data' });
  }

  const { population, area } = cityData;

  try {
    // Get AQI data
    const aqiResponse = await axios.get(`https://api.waqi.info/feed/${city}/?token=${aqiApiKey}`);
    const aqiData = aqiResponse.data;

    if (aqiData.status !== 'ok') {
      return res.status(404).json({ error: 'City not found for AQI' });
    }

    const curAQI = aqiData.data.aqi;
    const message= "The current AQI is less than target AQI."
    // Calculate the number of trees required
    const avgCarbonAbsorption = 10; // kg/tree
    const treesPerKm2 = 100; // trees/km²
    const totalCarbonAbsorptionNeeded = (curAQI - targetAQI) * population * 0.001; // kg
    const treesNeeded = Math.ceil(totalCarbonAbsorptionNeeded / avgCarbonAbsorption);
    const requiredArea = treesNeeded / treesPerKm2; // in km²
    if (requiredArea < 0) {
      return res.json({
        city,
        curAQI,
        targetAQI,
        population,
        area,
        requiredArea : 0
      })
    }
    return res.json({
      city,
      curAQI,
      targetAQI,
      population,
      area,
      treesNeeded,
      requiredArea: requiredArea.toFixed(2), // in km²
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 