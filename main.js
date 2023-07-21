/** @format */

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let dayIndex = date.getDay();
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  h1.innerHTML = `It is ${temperature}°C in ${city}`;
}

function searchCity(city) {
  let apiKey = "110d1f30561908dfc65d9f975b82c174";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let searchQuery = document.querySelector("#search-query").value;
  searchCity(searchQuery);
}

function showPosition(position) {
  let apiKey = "110d1f30561908dfc65d9f975b82c174";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(showPosition);
});

// Display current date and time
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Show default weather for Sydney on page load
searchCity("Sydney");
