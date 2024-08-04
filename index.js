// index.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Weather Information Service');
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).send('City is required');
  }

  try {
    const response = await axios.get(`http://api.weatherstack.com/current`, {
      params: {
        access_key: WEATHERSTACK_API_KEY,
        query: city,
      },
    });

    const data = response.data;
    if (data.error) {
      return res.status(404).send(data.error.info);
    }

    const weatherInfo = {
      location: data.location.name,
      temperature: data.current.temperature,
      weather_descriptions: data.current.weather_descriptions[0],
      wind_speed: data.current.wind_speed,
      humidity: data.current.humidity,
    };

    res.json(weatherInfo);
  } catch (error) {
    res.status(500).send('Error fetching weather data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
