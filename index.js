const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHERSTACK_API_KEY;

app.use(express.json());
app.use(express.static('public'));

app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: API_KEY,
                query: city
            }
        });

        if (response.data.error) {
            return res.status(400).json({ error: response.data.error.info });
        }

        const weatherData = response.data;
        res.json({
            requested_city: city,
            location: weatherData.location.name,
            temperature: weatherData.current.temperature,
            weather_descriptions: weatherData.current.weather_descriptions,
            wind_speed: weatherData.current.wind_speed,
            humidity: weatherData.current.humidity
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
