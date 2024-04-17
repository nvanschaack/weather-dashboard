const submit = document.getElementById('form')
const searchBar = document.getElementById('search-bar')
const currentWeather = document.getElementById('current-weather')
const forecast = document.getElementById('forecast')
const searchHistory = document.getElementById('recent-searches')
const storeSearchCity = JSON.parse(localStorage.getItem('storeSearchCity')) || []

//add a submit event to the search button, have it present getCurrentWeatherApi & getForecastWeatherApi on the DOM
submit.addEventListener('submit', function (event) {
    event.preventDefault();

    const searchInput = searchBar.value

    currentWeather.innerHTML = ''
    forecast.innerHTML = ''
    searchHistory.innerHTML = ''

    getCurrentWeatherApi(searchInput)
    getForecastWeatherApi(searchInput)
})

// i want the city stored in local storage to appear under the search bar when i search a new city
function runStorage() {
    searchHistory.innerHTML = ' '
    for (let i = 0; i < storeSearchCity.length; i++) {
        const element = storeSearchCity[i];
        const recentSearches = document.createElement('button')
        recentSearches.textContent = element
        recentSearches.addEventListener('click', function () {

            const city = this.textContent;
            getCurrentWeatherApi(city);
            getForecastWeatherApi(city);
            console.log(city)

        })
        searchHistory.appendChild(recentSearches)
    }
}

function saveToStorage(city) {
    // console.log(city);
    if (city !== undefined) {
        if (storeSearchCity.includes(city)) {
            return
        }

        storeSearchCity.push(city)

        const storeSearchCityString = JSON.stringify(storeSearchCity);

        localStorage.setItem('storeSearchCity', storeSearchCityString)
    }
}

//retrieve current weather in any given city
function getCurrentWeatherApi(city) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=92fcbfd3ad1811da2b8b45a50a20bd0c&units=imperial`

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log('current weather', data)

            currentWeather.innerHTML = ' '

            saveToStorage(data.name)
            runStorage()
            // with data, i want to present it in current weather div
            //create element(s) to put city name, date, weather icon, temperature, humidity, and wind

            const newWeatherDiv = document.createElement('div')
            const cityName = document.createElement('h2')
            const temperature = document.createElement('p')
            const humidity = document.createElement('p')
            const wind = document.createElement('p')
            const unixTimestamp = data.dt;
            const date = new Date(unixTimestamp * 1000);
            const timeString = date.toLocaleDateString();
            const icon = document.createElement('img')
            icon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)

            cityName.textContent = data.name + ' ' + timeString
            temperature.textContent = `The current temperature is ${data.main.temp}℉`
            humidity.textContent = `The humidity is ${data.main.humidity}%`
            wind.textContent = `The wind speed is ${data.wind.speed}mph`

            newWeatherDiv.append(cityName, icon, temperature, humidity, wind)
            currentWeather.append(newWeatherDiv)

            newWeatherDiv.setAttribute('id', 'current-weather')
        })
}

//retrieve 5-day forecast in same city 
function getForecastWeatherApi(city) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=92fcbfd3ad1811da2b8b45a50a20bd0c&units=imperial`

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log('forecast', data)
            
            forecast.innerHTML = ' '
            
            // i want to make a loop so that the weather dashboard will display the 5-day forecast (at noon?)
            for (let i = 0; i < data.list.length; i++) {
                const element = data.list[i];
                if (element.dt_txt.split(' ')[1] === '12:00:00' && i > 0) {
                    // console.log(element)
            
                    const newForecastDiv = document.createElement('div')
                    const temperature = document.createElement('p')
                    const humidity = document.createElement('p')
                    const wind = document.createElement('p')
                    const unixTimestamp = element.dt;
                    const date = new Date(unixTimestamp * 1000);
                    const timeString = date.toLocaleDateString();
                    const icon = document.createElement('img')
                    icon.setAttribute('src', `http://openweathermap.org/img/w/${element.weather[0].icon}.png`)

                    temperature.textContent = `Temperature: ${element.main.temp}℉`
                    humidity.textContent = `Humidity ${element.main.humidity}%`
                    wind.textContent = `Wind Speed: ${element.wind.speed}mph`

                    newForecastDiv.append(timeString, ' ', icon, temperature, humidity, wind)
                    forecast.append(newForecastDiv)

                    newForecastDiv.setAttribute('id', 'each-day-forecast')
                }
            }
        })
}

runStorage()
