const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");

// Convert city name → coordinates (simple demo mapping)
const cityCoordinates = {
  mumbai: { lat: 19.0760, lon: 72.8777 },
  delhi: { lat: 28.7041, lon: 77.1025 },
  london: { lat: 51.5072, lon: -0.1276 },
  newyork: { lat: 40.7128, lon: -74.0060 }
};

getWeatherBtn.addEventListener("click", fetchWeather);

async function fetchWeather() {
  const city = cityInput.value.trim().toLowerCase();

  if (!cityCoordinates[city]) {
    alert("City not available in demo list.");
    return;
  }

  const { lat, lon } = cityCoordinates[city];

  loading.style.display = "block";
  weatherCard.innerHTML = "";

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error("Network response was not OK");
    }

    const data = await response.json();

    const temperature = data.current_weather.temperature;
    const windspeed = data.current_weather.windspeed;

    weatherCard.innerHTML = `
      <h3>📍 ${city.toUpperCase()}</h3>
      <p>🌡 Temperature: ${temperature} °C</p>
      <p>💨 Wind Speed: ${windspeed} km/h</p>
    `;

  } catch (error) {
    weatherCard.innerHTML = "❌ Error fetching weather data.";
    console.error("Error:", error);
  } finally {
    loading.style.display = "none";
  }
}