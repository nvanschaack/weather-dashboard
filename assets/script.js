const submit = document.getElementById('form')
const searchBar = document.getElementById('search-bar')
const currentWeather = document.getElementById('current-weather')
const forecast = document.getElementById('forecast')

submit.addEventListener('submit', function (event) {
    event.preventDefault();

    // console.log (searchBar.value)
    //what goes into the searchvalue, i want saved to local storage
    const searchInput = searchBar.value
    // localStorage.setItem('searchInput', searchInput)
    //need to getItem from localStorage
    currentWeather.innerHTML = null
    forecast.innerHTML = null

    getCurrentWeatherApi(searchInput)
    getForecaseWeatherApi(searchInput)

})

function getCurrentWeatherApi(city) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=92fcbfd3ad1811da2b8b45a50a20bd0c&units=imperial`

    fetch(requestUrl)
        .then(function (response) {
            // console.log(response);
            return response.json()
        })
        .then(function (data) {
            console.log('current weather', data)
            // with data, i want to present it in current weather div
            //create element(s) to put city name, date, weather icon, temperature, humidity, and wind
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

            currentWeather.append(cityName, icon, temperature, humidity, wind)

            currentWeather.setAttribute('id', 'current-weather')
        })

}

function getForecaseWeatherApi(city) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=92fcbfd3ad1811da2b8b45a50a20bd0c&units=imperial`

    fetch(requestUrl)
        .then(function (response) {
            // console.log(response);
            return response.json()
        })
        .then(function (data) {
            console.log('forecast', data)

            // i want to make a loop so that the weather dashboard will display the 5-day forecast (at noon?)
            for (let i = 0; i < data.list.length; i++) {
                const element = data.list[i];
                if (element.dt_txt.split(' ')[1] === '12:00:00' && i > 0) {
                    console.log(element)
                    const temperature = document.createElement('p')
                    const humidity = document.createElement('p')
                    const wind = document.createElement('p')
                    const unixTimestamp = element.dt;
                    const date = new Date(unixTimestamp * 1000);
                    const timeString = date.toLocaleDateString();
                    const icon = document.createElement('img')
                    icon.setAttribute('src', `http://openweathermap.org/img/w/${element.weather[0].icon}.png`)

                    temperature.textContent = `The current temperature is ${element.main.temp}℉`
                    humidity.textContent = `The humidity is ${element.main.humidity}%`
                    wind.textContent = `The wind speed is ${element.wind.speed}mph`

                    forecast.append(timeString, icon, temperature, humidity, wind)
                }
            }
        })
}


