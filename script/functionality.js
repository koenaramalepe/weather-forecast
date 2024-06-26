function updateWeatherData(response){   
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

    let displayedCity = document.querySelector("#city-name");
    displayedCity.innerHTML = response.data.city

    let descriptionElement = document.querySelector("#weatherDescription");
    descriptionElement.innerHTML = response.data.condition.description

    let humidityElement = document.querySelector("#humidity")
    let humidityValue = response.data.temperature.humidity
    humidityElement.innerHTML = `${humidityValue}%`

    let windElement = document.querySelector("#windData");
    let windElementValue = response.data.wind.speed
    windElement.innerHTML = `${windElementValue}km/h`

    timeElement = document.querySelector("#time")
    let date= new Date(response.data.time * 1000)
    timeElement.innerHTML = formatDate(date)
    
   let iconElement = document.querySelector("#icon");
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class"Weather-app-icon" />`
   
   getForecast(response.data.city)
}

function formatDate(date){
    
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let day = days[date.getDay()]

    if (minutes < 10){
        minutes = `0${minutes}`
    }

    return `${day} ${hours}:${minutes},`
    

}

function searchCity(city){
    let apiKey = "b43bc25t07dffbba80b4fec67770a5o8";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(updateWeatherData);
   
}
function handlingResponse(event){
    event.preventDefault();
    let cityValue = document.querySelector("#search-input");
    
    searchCity(cityValue.value);
}

function getForecast(city){
    let apiKey = "b43bc25t07dffbba80b4fec67770a5o8";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp){
    let date = new Date(timestamp *1000);
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return days[date.getDay()];
}

function displayForecast(response) {
    
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHtml = "";

    response.data.daily.forEach(function(day,index) {
        if (index < 5) {
        forecastHtml= forecastHtml +
        `
        <div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <div >
            <img src="${day.condition.icon_url}" class="forecast-icon" />
        </div>
        <div class="forecast-temperatures">
        <div class="forecast-max">${Math.round(day.temperature.maximum)}°</div>
        <div class="forecast-min">${Math.round(day.temperature.minimum)}°</div>
        </div>
        </div>`;
        }
    });

    forecastElement.innerHTML = forecastHtml;
    
}



let formInput = document.querySelector("#form1");
formInput.addEventListener("submit", handlingResponse);

searchCity("Polokwane");
displayForecast();



