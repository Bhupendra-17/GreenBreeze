import React, { useState } from 'react';
import axios from 'axios';

function AqiDisplay() {
  const [cityInput, setCityInput] = useState('');
  const [vegetationIndex, setVegetationIndex] = useState('');
  const [populationInput, setPopulationInput] = useState('');
  const [areaInput, setAreaInput] = useState('');
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCityData = async () => {
    if (!cityInput) {
      setError('Please enter a city');
      return;
    }

    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      console.log(`Fetching data for city: ${cityInput}`);
      const response = await axios.get(`http://localhost:5000/api/citydata?city=${cityInput}`);
      console.log('API Response:', response.data); // Log the API response

      const cityDetails = response.data;

      // Fallback to user input for population and area if not provided by the API
      const population = cityDetails.population || populationInput;
      const area = cityDetails.area || areaInput;

      // Calculate the required plantation area using your custom algorithm
      const requiredPlantationArea = calculatePlantationArea(cityDetails.aqi, vegetationIndex, population, area);

      setCityData({
        ...cityDetails,
        population,
        area,
        requiredPlantationArea,
      });
    } catch (error) {
      console.error('Error fetching city data:', error); // Log error for debugging
      setError('City not found or error fetching data');
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };

  // Custom algorithm for calculating the required plantation area
  const calculatePlantationArea = (aqi, vegetationIndex, population, area) => {
    // Example formula (replace with your actual algorithm):
    const plantationFactor = 0.1; // This could be based on real-world data
    return ((aqi / vegetationIndex) * population * plantationFactor) / area;
  };

  return (
    <div className=' flex flex-col gap-4 items-center'>
      <div className='flex gap-4 items-center'>
        <input
          type="text"
          placeholder="Enter city"
          value={cityInput}
          className='px-3 py-2 border border-gray-600 rounded-lg'
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button
          onClick={fetchCityData}
          className='bg-green-500 text-white font-semibold rounded-lg px-4 py-2'
          disabled={loading || !cityInput}
        >
          {loading ? 'Fetching...' : 'Get Data'}
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex flex-col gap-4 mt-4">
        {/* Input for vegetation index */}
        <input
          type="number"
          placeholder="Vegetation Index"
          value={vegetationIndex}
          className='px-3 py-2 border border-gray-600 rounded-lg'
          onChange={(e) => setVegetationIndex(e.target.value)}
        />

        {/* Optional inputs for population and area if not fetched */}
        <input
          type="number"
          placeholder="Population (if not fetched)"
          value={populationInput}
          className='px-3 py-2 border border-gray-600 rounded-lg'
          onChange={(e) => setPopulationInput(e.target.value)}
        />

        <input
          type="number"
          placeholder="Area (if not fetched) in km²"
          value={areaInput}
          className='px-3 py-2 border border-gray-600 rounded-lg'
          onChange={(e) => setAreaInput(e.target.value)}
        />
      </div>

      {cityData && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-600">{cityData.city}</h2>
          <p className="text-lg">AQI: {cityData.aqi}</p>
          <p className="text-lg">Population: {cityData.population}</p>
          <p className="text-lg">Area: {cityData.area} km²</p>
          <p className="text-lg font-bold text-green-700">
            Required Plantation Area: {cityData.requiredPlantationArea.toFixed(2)} hectares
          </p>
        </div>
      )}
    </div>
  );
}

export default AqiDisplay;
