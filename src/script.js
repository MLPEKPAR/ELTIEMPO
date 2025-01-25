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

let dateElement = document.querySelector("#current-date-time");
let newDate = new Date();
dateElement.innerHTML = displayCurrentDate(newDate);

// import API data

function displaySearchResults(response) {
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = response.data.wind.speed;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let iconElement = document.innerHTML("#current-icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
  let currenTempElement = document.querySelector("#current-temperature");
  currenTempElement = response.data.temperture.current;
}

let apiKey = "11edc9a3d0f3o475000at9446642fb9a";
let unit = "metric";
let query = document.querySelector("#enter-city");
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(displaySearchResults);
