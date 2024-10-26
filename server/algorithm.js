
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS for React frontend
app.use(cors());

// API keys from environment variables
const aqiApiKey = '228b29504d3434826beaab2ce4f305430446d9b1';
const geoDbApiKey = '54f36ecef8msh5e1ba8c380116a1p1b24b0jsn69082316784b';

// Enable CORS for React frontend
app.use(cors());

// Calculation function
function calculate(currentAQI, targetAQI, population, area) {
  const pollutionReductionNeeded = (currentAQI - targetAQI) * population;
  const averageCarbonSequestrationRate = 10; // kg CO2/year per tree
  const treesPerHectare = 100; // Estimated number of trees per hectare
  const requiredPlantationArea = (pollutionReductionNeeded / averageCarbonSequestrationRate) / treesPerHectare;

  // Check if the required plantation area exceeds half of the city's area
  if (requiredPlantationArea > area / 2) {
    return {
      error: true,
      message: `The required plantation area (${requiredPlantationArea.toFixed(2)} hectares) exceeds half the city's area.`
    };
  }

  // Return the calculated area if everything is fine
  return { error: false, plantationArea: requiredPlantationArea.toFixed(2) };
}

// Fetch AQI and city data (population, area)
// Fetch AQI and city data (population, area)
app.get('/api/citydata', async (req, res) => {
  const city = req.query.city || 'Raipur';
  const targetAQI = req.query.targetAQI || 50; // Use the target AQI input from the client

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    // Fetch AQI data
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
    const population = cityData.population || 500000; // Default if not found
    const area = cityData.area || 450; // Default area in km²

    const result = calculate(aqi, targetAQI, population, area);

    if (result.error) {
      // Return a custom message if the required plantation area exceeds half the city's area
      return res.status(400).json({ error: result.message });
    }

    // Send the successful response
    return res.json({
      city: cityData.name,
      aqi,
      population,
      area,
      requiredPlantationArea: result.plantationArea,
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function AqiDisplay() {
//   const [cityInput, setCityInput] = useState('');
//   const [populationInput, setPopulationInput] = useState('');
//   const [areaInput, setAreaInput] = useState('');
//   const [aqiInput, setAqiInput] = useState('');
//   const [aqiToReachInput, setAqiToReachInput] = useState('');
//   const [cityData, setCityData] = useState(null);
//   const [customData, setCustomData] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [warningMessage, setWarningMessage] = useState(''); // State for warning message

//   const fetchCityData = async () => {
//     if (!cityInput) {
//       setError('Please enter a city');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setCityData(null);
//     setWarningMessage(''); // Reset warning message

//     try {
//       // Pass the target AQI to the server
//       const response = await axios.get(`http://localhost:5000/api/citydata?city=${cityInput}&targetAQI=${aqiToReachInput}`);
//       const cityDetails = response.data;

//       if (cityDetails.error) {
//         setCityData({ message: cityDetails.error });
//       } else {
//         const population = cityDetails.population || populationInput;
//         const area = cityDetails.area || areaInput;
//         const requiredPlantationArea = cityDetails.requiredPlantationArea;

//         // Check if required plantation area is greater than half of the city's area
//         if (requiredPlantationArea > area / 2) {
//           setWarningMessage("Only plantation can't improve the AQI of the particular area");
//         }

//         setCityData({ ...cityDetails, population, area, requiredPlantationArea });
//       }
//     } catch (error) {
//       console.error('Error fetching city data:', error);
//       setError('City not found or error fetching data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCustomCalculation = () => {
//     if (!aqiInput || !aqiToReachInput || !populationInput || !areaInput) {
//       setError('Please fill in all fields for custom calculation');
//       return;
//     }

//     setCityData(null);
//     const requiredPlantationArea = calculatePlantationArea(aqiInput, populationInput, areaInput, aqiToReachInput);

//     // Check if required plantation area is greater than half of the area input
//     if (requiredPlantationArea > areaInput / 2) {
//       setWarningMessage("Only plantation can't improve the AQI of the particular area");
//     }

//     setCustomData({ aqi: aqiInput, aqiToReach: aqiToReachInput, population: populationInput, area: areaInput, requiredPlantationArea });
//   };

//   const calculatePlantationArea = (currentAQI, population, area, targetAQI) => {
//     const pollutionReductionNeeded = (currentAQI - targetAQI) * population;
//     const averageCarbonSequestrationRate = 10; // kg CO2/year per tree
//     const treesPerHectare = 100; // Estimated number of trees per hectare
//     const requiredPlantationArea = (pollutionReductionNeeded / averageCarbonSequestrationRate) / treesPerHectare;

//     // Return the calculated area
//     return requiredPlantationArea.toFixed(2);
//   };

//   return (
//     <div className="p-4">
//       {/* Method 1: City Input */}
//       <div className="grid gap-4 bg-white bg-opacity-70 rounded-lg p-4 max-w-3xl mx-auto">
//         <h3 className="font-bold text-lg">City Input</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <input
//             type="text"
//             placeholder="Enter city"
//             value={cityInput}
//             className="px-3 py-2 border border-gray-600 rounded-lg w-full"
//             onChange={(e) => setCityInput(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Target AQI"
//             value={aqiToReachInput}
//             className="px-3 py-2 border border-gray-600 rounded-lg w-full"
//             onChange={(e) => setAqiToReachInput(e.target.value)}
//           />
//           <button
//             onClick={fetchCityData}
//             className="bg-green-500 text-white font-semibold rounded-lg px-4 py-2 w-full sm:col-span-2 md:col-span-1"
//             disabled={loading || !cityInput || !aqiToReachInput}
//           >
//             {loading ? 'Fetching...' : 'Calculate'}
//           </button>
//         </div>
//       </div>

//       <h1 className="font-bold text-xl text-center my-6">OR</h1>

//       {/* Method 2: Custom Fields */}
//       <div className="grid gap-4 bg-white bg-opacity-70 rounded-lg p-4 max-w-3xl mx-auto">
//         <h3 className="font-bold text-lg">Custom Inputs</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <input
//             type="number"
//             placeholder="Population"
//             value={populationInput}
//             className="px-3 py-2 border border-gray-600 rounded-lg w-full"
//             onChange={(e) => setPopulationInput(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Area (in km²)"
//             value={areaInput}
//             className="px-3 py-2 border border-gray-600 rounded-lg w-full"
//             onChange={(e) => setAreaInput(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Current AQI"
//             value={aqiInput}
//             className="px-3 py-2 border border-gray-600 rounded-lg w-full"
//             onChange={(e) => setAqiInput(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Target AQI"
//             value={aqiToReachInput}
//             className="px-3 py-2 border border-gray-600 rounded-lg w-full"
//             onChange={(e) => setAqiToReachInput(e.target.value)}
//           />
//           <button
//             onClick={handleCustomCalculation}
//             className="bg-green-600 text-white font-semibold rounded-lg px-4 py-2 w-full sm:col-span-2 md:col-span-1"
//             disabled={!populationInput || !areaInput || !aqiInput || !aqiToReachInput}
//           >
//             Calculate
//           </button>
//         </div>
//       </div>

//       {error && <p className="text-red-600 text-center mt-4">{error}</p>}

//       {/* Display warning message if needed */}
//       {warningMessage && <p className="text-orange-600 text-center mt-4">{warningMessage}</p>}

//       {/* Display city data */}
//       {cityData && cityData.message ? (
//         <div className="mt-6 bg-red-100 shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
//           <h3 className="text-xl font-bold mb-4">{cityData.message}</h3>
//           <p>
//             For more information, refer to our <Link to="/knowledge" className="text-blue-500">Knowledge Hub</Link>.
//           </p>
//         </div>
//       ) : (
//         cityData && (
//           <div className="mt-6 bg-green-100 shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
//             <h3 className="text-xl font-bold mb-4">City: {cityData.city}</h3>
//             <p>AQI: {cityData.aqi}</p>
//             <p>Population: {cityData.population}</p>
//             <p>Area: {cityData.area} km²</p>
//             <p>Required Plantation Area: {cityData.requiredPlantationArea} km²</p>
//           </div>
//         )
//       )}

//       {/* Display custom calculation data */}
//       {customData && (
//         <div className="mt-6 bg-blue-100 shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
//           <h3 className="text-xl font-bold mb-4">Custom Calculation</h3>
//           <p>AQI: {customData.aqi}</p>
//           <p>Target AQI: {customData.aqiToReach}</p>
//           <p>Population: {customData.population}</p>
//           <p>Area: {customData.area} km²</p>
//           <p>Required Plantation Area: {customData.requiredPlantationArea} km²</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AqiDisplay;

