let now = new Date();
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let today = document.querySelector(".today");
function formatDate() {
  today.innerHTML = `${day}, ${date} ${month}, ${year}`;
}
formatDate();
let time = document.querySelector(".time");
function formatTime() {
  time.innerHTML = `${hour}:${minutes}`;
}
formatTime();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showTemp(response) {
  let tempHeading = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");

  celsiusTemp = response.data.main.temp;

  let currentTemp = Math.round(celsiusTemp);
  tempHeading.innerHTML = currentTemp;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function displayC(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celsiusTemp);
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayC);

function displayF(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  let tempF = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(tempF);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayF);

let celsiusTemp = null;

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="grid">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="row cols-3" style="width: 20rem">
              <div class="col" id=forecast-day>${formatDay(
                forecastDay.dt
              )}</div>
              <div class="col" id=forecast-temp>${Math.round(
                forecastDay.temp.day
              )}</div>
              <div class="col" id=forecast-icon><img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width=70 /></div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "55aafc03209b22601e8e8c1b2d96bad0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function citySearch(city) {
  let apiKey = "55aafc03209b22601e8e8c1b2d96bad0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  axios.get(`${apiUrl}${city}&units=metric&appid=${apiKey}`).then(showTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  citySearch(cityInputElement.value);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

citySearch("Guildford");
