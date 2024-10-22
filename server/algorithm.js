// Function to log the population, area, and vegetation index
function logCityData(cityName, population, area, vegetationIndex) {
    console.log(`City: ${cityName}`);
    console.log(`Population: ${population}`);
    console.log(`Area (sq.km): ${area}`);
    console.log(`Vegetation Index: ${vegetationIndex}`);
}

// Algorithm to estimate the plantation area required to improve AQI
function calculatePlantationArea(population, area, vegetationIndex, targetAqi) {
    // Constants based on research or assumptions (adjust these as needed)
    const vegetationImpactFactor = 0.02;  // Assumed impact of vegetation on AQI
    const populationImpactFactor = 0.01;  // Assumed impact of population on AQI
    const areaImpactFactor = 0.005;       // Assumed impact of area on AQI

    // Compute a base plantation area based on the city's characteristics
    let basePlantationArea = (population * populationImpactFactor)
        + (area * areaImpactFactor)
        + ((1 - vegetationIndex) * vegetationImpactFactor);

    // Formula to adjust the plantation area based on target AQI improvement
    // Assumption: The more we want to decrease AQI, the more plantation is needed
    const currentAqi = 100;  // Assuming current AQI, replace this with actual data
    const aqiDifference = currentAqi - targetAqi;
    const plantationAreaNeeded = basePlantationArea * (aqiDifference / 10);  // Adjust by AQI difference

    return plantationAreaNeeded;
}

// Example usage
const cityName = 'Delhi';
const population = 500000;       // Population of the city
const area = 200;                // Area of the city in square kilometers
const vegetationIndex = 0.4;     // Vegetation index (0 to 1 scale, 0 = no vegetation, 1 = fully vegetated)
const targetAqi = 50;            // Target AQI we want to achieve

// Log city data
logCityData(cityName, population, area, vegetationIndex);

// Calculate plantation area required to improve AQI
const plantationArea = calculatePlantationArea(population, area, vegetationIndex, targetAqi);

// Output the result
console.log(`To achieve an AQI of ${targetAqi}, ${plantationArea.toFixed(2)} sq.km of plantation is required.`);

module.exports = { calculatePlantationArea };