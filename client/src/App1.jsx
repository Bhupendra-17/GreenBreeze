import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [cityName, setCityName] = useState('');
  const [currentAQI, setCurrentAQI] = useState(''); // Example default
  const [targetAQI, setTargetAQI] = useState('');    // Example default
  const [currentGreenArea, setCurrentGreenArea] = useState(''); // Example default
  const [population, setPopulation] = useState(''); // Example default
  const [cityArea, setCityArea] = useState(''); // Example default
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/geocode', {
        cityName,
        currentAQI,
        targetAQI,
        currentGreenArea,
        population,
        cityArea
      });
      
      setResult(response.data);
    } catch (error) {
      console.error('Error fetching AQI improvement data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-800 mb-4">GreenBreeze 🌿</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cityName">
            City Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="cityName"
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between">
          <div className="mb-4 w-1/2 pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentAQI">
              Current AQI
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="currentAQI"
              type="number"
              value={currentAQI}
              onChange={(e) => setCurrentAQI(e.target.value)}
            />
          </div>

          <div className="mb-4 w-1/2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="targetAQI">
              Target AQI
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="targetAQI"
              type="number"
              value={targetAQI}
              onChange={(e) => setTargetAQI(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <div className="mb-4 w-1/2 pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="population">
              Population
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="population"
              type="number"
              value={population}
              onChange={(e) => setPopulation(e.target.value)}
            />
          </div>

          <div className="mb-4 w-1/2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentGreenArea">
              Green Area (km²)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="currentGreenArea"
              type="number"
              value={currentGreenArea}
              onChange={(e) => setCurrentGreenArea(e.target.value)}
            />
          </div>
        </div>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Calculate Green Space
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-white shadow-md rounded">
          <h3 className="text-xl font-semibold">Results</h3>
          <p>Coordinates of {result.cityName}: Latitude: {result.coordinates.lat}, Longitude: {result.coordinates.lng}</p>
          <p>Required Additional Green Space: {result.requiredGreenSpace.toFixed(2)} km²</p>
        </div>
      )}
    </div>
  );
};

export default App;
