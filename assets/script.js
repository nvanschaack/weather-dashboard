const submit = document.getElementById('form')
const searchBar = document.getElementById('search-bar')
const currentWeather = document.getElementById('current-weather')

submit.addEventListener('submit', function (event) {
    event.preventDefault();

    // console.log (searchBar.value)
    //what goes into the searchvalue, i want saved to local storage
    const searchInput = searchBar.value
    // localStorage.setItem('searchInput', searchInput)
    //need to getItem from localStorage

    getCurrentWeatherApi(searchInput)
    getForecaseWeatherApi(searchInput)

})

//need to replace {city name} in requestUrl with the searchBar the user types in (line 14&15)
//


function getCurrentWeatherApi(city) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=92fcbfd3ad1811da2b8b45a50a20bd0c&units=imperial`

    fetch(requestUrl)
        .then(function (response) {
            // console.log(response);
            return response.json()
        })
        .then(function (data) {
            console.log('current weather',data)
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

       


            cityName.textContent = data.name + ' '+timeString
            temperature.textContent = `The current temperature is ${data.main.temp}℉`
            humidity.textContent = `The humidity is ${data.main.humidity}%`
            wind.textContent = `The wind speed is ${data.wind.speed}mph`


            currentWeather.append(cityName, icon, temperature, humidity, wind)

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
            console.log('Forecast',data)


            
            // with data, i want to present it in current weather div
            // //create element(s) to put city name, date, weather icon, temperature, humidity, and wind
            // const cityName = document.createElement('h2')
            // const temperature = document.createElement('p')
            // const humidity = document.createElement('p')
            // const wind = document.createElement('p')
            // const unixTimestamp = data.dt;
            // const date = new Date(unixTimestamp * 1000);
            // const timeString = date.toLocaleDateString();
            // const icon = document.createElement('img')
            // icon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)

       


            // cityName.textContent = data.name + ' '+timeString
            // temperature.textContent = `The current temperature is ${data.main.temp}℉`
            // humidity.textContent = `The humidity is ${data.main.humidity}%`
            // wind.textContent = `The wind speed is ${data.wind.speed}mph`


            // currentWeather.append(cityName, icon, temperature, humidity, wind)

        })

}

