var apiKey = "75a4001fc2cc51b43800eaa273e443f3"
var pastSearchEl = $("#pastSearch")
var searchHistory = JSON.parse(localStorage.getItem("history")) || []
function getCity (){
  if ($(this).attr("id")==="search"){

    var city = $("#searchInput").val();
    searchHistory.push(city)
    localStorage.setItem("history" , JSON.stringify(searchHistory));
  } else {
    var city = $(this).text()
  }
    renderButtons()
    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    fetch(url).then(response => response.json())
    .then(data => {
        getWeather(data[0].lat, data[0].lon);
        getFiveDay(data[0].lat, data [0].lon);
});
        
};

function renderButtons() {
  pastSearchEl.empty()
  console.log(searchHistory)
  searchHistory.forEach(function(city){
    var button = $("<button>")
    button.text(city)
    pastSearchEl.append(button)
  })
};

function getWeather ( lat , lon){
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(url).then(response => response.json())
    .then(data => {
        console.log(data)
        var currentDayEl = $("#currentDay")
        var html = `<div class="card" style="width: 18rem;">
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">Temp: ${data.main.temp} </p>
          <p class="card-text">Humidity: ${data.main.humidity} </p>
          <p class="card-text">Wind Speed: ${data.wind.speed} </p>
        </div>
      </div>`
      currentDayEl.html(html)
})
};


function getFiveDay ( lat , lon){
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(url).then(response => response.json())
    .then(data => {
        console.log(data)
        var html = []
        var fiveDayEl = $("#fiveDay")
        for (let i = 15; i< data.list.length; i+=8){
            
        html.push(`<div class="card" style="width: 18rem;">
        <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">Date: ${moment.unix(data.list[i].dt).format("DD/MM/YYYY hh a")} </p>
          <p class="card-text">Temp: ${data.list[i].main.temp} </p>
          <p class="card-text">Humidity: ${data.list[i].main.humidity} </p>
          <p class="card-text">Wind Speed: ${data.list[i].wind.speed} </p>
        </div>
      </div>`
    )}
      fiveDayEl.html(html.join(""))
    })
};




renderButtons()






pastSearchEl.on("click" , "button" , getCity);
$("#search").on("click",getCity);
 
