//Current day/time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = `${day}`;
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hours}:${minutes}`;
//Display city on load
function search(city) {
  let units = "imperial";
  let apiKey = "1743d71cea491649f0bd96f06af46d71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

//Display city
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${searchInput.value}`;
  let city = `${searchInput.value}`;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//API Call
function showTemperature(response) {
  //weather description
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}`;
  //Use the name that the API gives us back
  document.querySelector("#current-location").innerHTML = response.data.name;
}
//Get Current Location
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1743d71cea491649f0bd96f06af46d71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

search("Raleigh");
//Display Degrees F or C
// function convertToFahrenheit(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = 93;
// }
// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// function convertToCelcius(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = 34;
// }

// let celciusLink = document.querySelector("#celcius-link");
// celciusLink.addEventListener("click", convertToCelcius);
