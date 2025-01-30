// import API data

function displaySearchResults(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let localTimeElement = document.querySelector("#current-date-time");
  let date = new Date(response.data.time * 1000);
  localTimeElement.innerHTML = displayCurrentDate(date);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${Math.round(
    response.data.temperature.humidity
  )} %`;
  let iconElement = document.querySelector("#current-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current
  )}`;
  let unitElement = document.querySelector("#current-unit");
  unitElement.innerHTML = "ºC";

  obtainForecast(response.data.city);
}

// day and time permanently updated

function displayCurrentDate(date) {
  let day = date.getDay();
  let Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  formattedDay = Days[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${formattedDay}, ${hour}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "11edc9a3d0f3o475000at9446642fb9a";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displaySearchResults);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#enter-city");
  let city = searchInput.value;

  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

searchCity("Málaga");

// Adding 5-day weather forecast and integrating API for real time data

function obtainForecast(city) {
  let apiKey = "11edc9a3d0f3o475000at9446642fb9a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatForecastDay(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let forecastDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return forecastDay[forecastDate.getDay()];
}

function displayForecast(response) {
  let forecastFive = ""; // var permite "acumular" resultados del loop

  response.data.daily.forEach(function (day, index) {
    //atención aquí al orden paréntesis y llaves
    if (index < 5) {
      forecastFive =
        forecastFive +
        `
  <div class="forecast-day">
    <div class="day-name">${formatForecastDay(day.time)}</div>
    <div ><img src=${day.condition.icon_url} class="day-icon"/></div>
    <div class="day-temp">
      <div class="max">${Math.round(day.temperature.maximum)}º</div>
      <div class="min">${Math.round(day.temperature.minimum)}º</div>
    </div>
  </div>
`;
    }
  });

  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastFive;
}

displayForecast();
