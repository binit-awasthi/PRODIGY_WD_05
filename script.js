const apiKey = ""; //enter your api key here

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherStatus = document.querySelector(".status");

const weatherIcon = document.querySelector(".weather-icon i");

searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

async function checkWeather(arg1, arg2) {
  let apiUrlLocation;

  if (typeof arg2 === "undefined") {
    // City name provided
    apiUrlLocation = `${apiUrl}&q=${arg1}&appid=${apiKey}`;
  } else {
    // Latitude and Longitude provided
    apiUrlLocation = `${apiUrl}&lat=${arg1}&lon=${arg2}&appid=${apiKey}`;
  }

  const response = await fetch(apiUrlLocation);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    // document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    document.querySelector(".city").innerText = data.name;
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + "km/hr";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.setAttribute("class", "bx bx-cloud");
      weatherStatus.innerText = "cloudy";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.setAttribute("class", "bx bxs-sun");
      weatherStatus.innerText = "clear";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.setAttribute("class", "bx bx-cloud-rain");
      weatherStatus.innerText = "rainy";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.setAttribute("class", "bx bx-cloud-drizzle");
      weatherStatus.innerText = "drizzle";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.removeAttribute("class");
      weatherStatus.innerText = "mist";
      document.querySelector(".mist-svg").style.display = "inline-block";
    }
    document.querySelector(".error").style.display = "none";
    // document.querySelector(".weather").style.display = "block";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

const locationBtn = document.querySelector(".location");

let failed;

async function gotLocation(position) {
  console.log(position);
  lat = position.coords.latitude;
  long = position.coords.longitude;
  failed = false;
}

function failedToGet() {
  failed = true;
  console.log("failed to access the current location.");
}

navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
locationBtn.addEventListener("click", async () => {
  if (!failed) {
    checkWeather(lat, long);
    console.log("current location accessed");
  } else {
    alert("Location access blocked by user");
  }
});
