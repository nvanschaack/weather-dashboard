const submit = document.getElementById('form')
const searchBar = document.getElementById('search-bar')
const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=92fcbfd3ad1811da2b8b45a50a20bd0c'

submit.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log (searchBar.value)
    //what goes into the searchvalue, i want saved to local storage
    const searchInput = searchBar.value
    localStorage.setItem('searchInput', searchInput)
    //need to getItem from localStorage
    
    let updatedUrl = requestUrl.replace('{city name}', searchInput)
    console.log(updatedUrl)

})

//need to replace {city name} in requestUrl with the searchBar the user types in (line 14&15)
//

function citySearch () {

}
