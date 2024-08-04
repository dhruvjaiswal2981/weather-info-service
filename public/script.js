document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const weatherInfoDiv = document.getElementById('weather-info');

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (response.ok) {
            weatherInfoDiv.innerHTML = `
                <h2>Weather in ${data.location}</h2>
                <p><strong>Temperature:</strong> ${data.temperature} °C</p>
                <p><strong>Description:</strong> ${data.weather_descriptions.join(', ')}</p>
                <p><strong>Wind Speed:</strong> ${data.wind_speed} km/h</p>
                <p><strong>Humidity:</strong> ${data.humidity} %</p>
            `;
        } else {
            weatherInfoDiv.innerHTML = `<p>Error: ${data.error}</p>`;
        }
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
});
