const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Enable CORS for React frontend
app.use(cors());

// Initialize Supabase client
const supabaseUrl = 'https://xeykxvvvntaikmkgirbn.supabase.co'; // Your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleWt4dnZ2bnRhaWtta2dpcmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDQwNjUsImV4cCI6MjA0NTI4MDA2NX0.YxQugZUYyxB6mu0NKXHL5BPxKRnrfFPYqfiDBPC8EhM'; // Your Supabase anon/public key
const supabase = createClient(supabaseUrl, supabaseKey);
app.get('/api/citydata', async (req, res) => {
  const city = req.query.city || "Raipur";

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const { data, error } = await supabase
      .from('Citydata')
      .select('Area', 'Population', 'AQI') // Include AQI
      .eq('City', city)
      .single(); // Remove if not working

    console.log('Data:', data); // Log data for debugging
    console.log('Error:', error); // Log error for debugging

    if (error || !data) {
      console.error('Supabase error or city not found:', error);
      return res.status(404).json({ error: 'City not found in Supabase' });
    }

    return res.json({
      city,
      aqi: data.AQI,
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
