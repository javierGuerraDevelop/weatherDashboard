const apiKey = 'fb849d2619e25f350d09b75ee1f943cf';
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');

searchButton.addEventListener('click', () => {
  const city = cityInput.value;
  fetchCurrentWeather(city);
  fetchForecast(city);
});

function fetchCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayCurrentWeather(data);
    })
    .catch((error) => console.error('Error fetching current weather:', error));
}

function fetchForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data);
    })
    .catch((error) => console.error('Error fetching forecast:', error));
}

function displayCurrentWeather(data) {
  const weatherDiv = document.getElementById('current-weather');
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherDiv.innerHTML = `
      <h2>Current Weather for ${data.name}</h2>
      <img src="${iconUrl}" alt="Weather Icon">
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

function displayForecast(data) {
  const forecastDiv = document.getElementById('forecast');
  const forecastTitle = document.getElementById('forecast-title');
  forecastTitle.innerHTML = `<h2>5-Day Forecast</h2>`;
  forecastDiv.innerHTML = '';
  for (let i = 0; i < data.list.length; i += 8) {
    const iconCode = data.list[i].weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    forecastDiv.innerHTML += `
          <div class="forecast-item">
              <p>Date: ${new Date(data.list[i].dt * 1000).toDateString()}</p>
              <img src="${iconUrl}" alt="Weather Icon">
              <p>Temp: ${data.list[i].main.temp}°C</p>
              <p>Humidity: ${data.list[i].main.humidity}%</p>
              <p>Wind Speed: ${data.list[i].wind.speed} m/s</p>
          </div>
      `;
  }
}
