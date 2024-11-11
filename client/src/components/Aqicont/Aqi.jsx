import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AqiDisplay() {
  const [method, setMethod] = useState('city');
  const [cityInput, setCityInput] = useState('');
  const [targetAqiInput, setTargetAqiInput] = useState('');
  const [curAqiInput, setCurAqiInput] = useState('');
  const [populationInput, setPopulationInput] = useState('');
  const [areaInput, setAreaInput] = useState('');
  const [cityData, setCityData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState('');

  const fetchCityData = async () => {
    setLoading(true);
    setError('');
    setWarning('');

    try {
      let response;
      if (method === 'city') {
        if (!cityInput || !targetAqiInput) {
          setError('Please enter a city and target AQI');
          setLoading(false);
          return;
        }
        response = await axios.get(`http://localhost:5000/api/citydata?city=${cityInput}&targetAQI=${targetAqiInput}`);
      } else {
        const customParams = {
          curAQI: curAqiInput,
          targetAQI: targetAqiInput,
          population: populationInput,
          area: areaInput
        };
        response = { data: calculateCustomData(customParams) };
      }
    
      const cityDetails = response.data;
      const requiredArea = cityDetails.requiredArea;
    
      if (requiredArea > cityDetails.area / 2) {
        setWarning(
          <>
            Required area is more than half of the city's area. To control air pollution we suggest some measures, visit our{' '}
            <Link to="/knowledge" className="cursor-pointer text-green-600 underline">Knowledge page</Link>.
          </>
        );
        setCityData({ ...cityDetails, requiredArea: null });
      } else if (requiredArea < 0) {
        setWarning(
          <>
            The current AQI is already lower than the target AQI.
          </>
        );
        setCityData({ ...cityDetails, requiredArea: "NA" });
      } else {
        setCityData(cityDetails);
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
      setError('City not found or error fetching data');
      setCityData(null);
    } finally {
      setLoading(false);
    }    
  };

  const calculateCustomData = ({ curAQI, targetAQI, population, area }) => {
    const avgCarbonAbsorption = 10;
    const treesPerKm2 = 90;

    const totalCarbonAbsorptionNeeded = (curAQI - targetAQI) * population * 0.001;
    const treesNeeded = Math.ceil(totalCarbonAbsorptionNeeded / avgCarbonAbsorption);
    const requiredArea = treesNeeded / treesPerKm2;
    
    return {
      city: 'Custom Input',
      curAQI,
      targetAQI,
      population,
      area,
      treesNeeded,
      requiredArea: requiredArea.toFixed(2),
    };
  };

  return (
    <div className='flex flex-col gap-4 items-center'>
      <div className="flex px-4 py-3 gap-4 items-center">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="city"
            checked={method === 'city'}
            onChange={() => setMethod('city')}
            className="form-radio h-5 w-5 accent-green-600 focus:ring-green-500"
          />
          <span className="text-gray-700 font-semibold hover:text-green-600">
            City and Target AQI
          </span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            value="custom"
            checked={method === 'custom'}
            onChange={() => setMethod('custom')}
            className="form-radio h-5 w-5 accent-green-600 focus:ring-green-500"
          />
          <span className="text-gray-700 font-semibold hover:text-green-600">
            Custom Input
          </span>
        </label>
      </div>

      {method === 'city' && (
        <div className='flex flex-col gap-4 '>
          <label className="text-gray-700 font-semibold">
            City
            <input
              type="text"
              placeholder="Enter city"
              value={cityInput}
              className='px-3 py-2 border border-gray-600 rounded-lg w-full'
              onChange={(e) => setCityInput(e.target.value)}
            />
          </label>
          <label className="text-gray-700 font-semibold">
            Target AQI
            <input
              type="number"
              placeholder="Target AQI"
              value={targetAqiInput}
              className='px-3 py-2 border border-gray-600 rounded-lg w-full'
              onChange={(e) => setTargetAqiInput(e.target.value)}
            />
          </label>
          <button
            onClick={fetchCityData}
            className='bg-green-500 text-white font-semibold rounded-lg px-4 py-2'
            disabled={loading || !cityInput || !targetAqiInput}
          >
            {loading ? 'Fetching...' : 'Calculate'}
          </button>
        </div>
      )}

      {method === 'custom' && (
        <div className='flex flex-col gap-4'>
          <label className="text-gray-700 font-semibold">
            Current AQI
            <input
              type="number"
              placeholder="Current AQI"
              value={curAqiInput}
              className='px-3 py-2 border border-gray-600 rounded-lg w-full'
              onChange={(e) => setCurAqiInput(e.target.value)}
            />
          </label>
          <label className="text-gray-700 font-semibold">
            Target AQI
            <input
              type="number"
              placeholder="Target AQI"
              value={targetAqiInput}
              className='px-3 py-2 border border-gray-600 rounded-lg w-full'
              onChange={(e) => setTargetAqiInput(e.target.value)}
            />
          </label>
          <label className="text-gray-700 font-semibold">
            Population
            <input
              type="number"
              placeholder="Population"
              value={populationInput}
              className='px-3 py-2 border border-gray-600 rounded-lg w-full'
              onChange={(e) => setPopulationInput(e.target.value)}
            />
          </label>
          <label className="text-gray-700 font-semibold">
            Area (in km²)
            <input
              type="number"
              placeholder="Area (in km²)"
              value={areaInput}
              className='px-3 py-2 border border-gray-600 rounded-lg w-full'
              onChange={(e) => setAreaInput(e.target.value)}
            />
          </label>
          <button
            onClick={fetchCityData}
            className='bg-green-500 text-white font-semibold rounded-lg px-4 py-2'
            disabled={loading || !curAqiInput || !targetAqiInput || !populationInput || !areaInput}
          >
            {loading ? 'Calculating...' : 'Calculate'}
          </button>
        </div>
      )}

      {error && <p className="text-red-600">{error}</p>}
      {warning && <p className="text-yellow-600 text-xl px-6 text-center">{warning}</p>}

      {cityData && (
        <div className="mt-6 bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-green-600">{cityData.city.toUpperCase()}</h2>
          <p className="text-lg">Current AQI: {cityData.curAQI}</p>
          <p className="text-lg">Target AQI: {cityData.targetAQI}</p>
          <p className="text-lg">Population: {cityData.population}</p>
          <p className="text-lg">Area: {cityData.area} km²</p>
          {cityData.requiredArea !== null && (
            <p className="text-lg font-bold text-green-700">
              Required Plantation Area: {cityData.requiredArea} km²
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AqiDisplay;