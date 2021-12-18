
var openWeatherAPIKey = "d3c34b7336549ad0c93d9f257bcf99d9";

function renderSearchHistory()
{
    var searched = JSON.parse(localStorage.getItem("previouslySearched"));

    if (searched == null) return;

    var searchHistoryEL = document.querySelector("#searchHistory");
    searchHistoryEL.innerHTML = "";

    for (var i = 0; i < searched.length; i++)
    {

        var newEL = document.createElement("button");
        newEL.setAttribute("class","history-button my-button");
        newEL.textContent = searched[i];

        

        newEL.addEventListener("click", function (event) {
            
            event.preventDefault();
            searchCityName(event.target.textContent);
        })

        searchHistoryEL.appendChild(newEL);
    }
}

function searchCityName(name)

{
    
    
    var urlRequest1 = 'https://geocode.xyz/' + name +'?json=1' ;
    console.log(name)
    fetch(urlRequest1)
    .then(function (response) {
        
        return response.json();
    })
    .then(function (data){
        console.log(data);


        var urlRequest2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.latt +"&lon="  + data.longt + "&appid="+openWeatherAPIKey + "&units=imperial";

        console.log(urlRequest2);

        fetch (urlRequest2)
        .then (function (response){
            return response.json();
        })
        .then (function (Data) {

            // setting Current Weather Data city name 
            document.querySelector("#CWD-city-name").textContent = name + " (" + moment().format("MM/DD/YYYY")+")";

            // setting Current Weather Data Icon
            var iconLink = "https://openweathermap.org/img/wn/" + Data.current.weather[0].icon + ".png";
            console.log(iconLink);
            document.querySelector("#CWD-icon").setAttribute("src",iconLink);

            // setting Current Weather Data temperature 
            document.querySelector("#CWD-temperature").textContent = Data.current.temp + "°";
            
            // setting Current Weather Data Wind 
            document.querySelector("#CWD-wind").textContent = Data.current.wind_speed + " mph";

            // setting Current Weather Data humidity
            document.querySelector("#CWD-humidity").textContent = Data.current.humidity + "%";

            // setting Current Weather Data UV index
            document.querySelector("#CWD-UV-index").textContent = Data.current.uvi ;

            var UV_dangerRating;
            var uvi = Data.current.uvi;

            if (uvi < 2)
                UV_dangerRating = "UV-low";
            else if (uvi < 6)
                UV_dangerRating = "UV-med";
            else if (uvi < 8)
                UV_dangerRating = "UV-high";
            else if (uvi < 11)
                UV_dangerRating = "UV-very-high";
            else
                UV_dangerRating = "UV-danger";

            document.querySelector("#CWD-UV-index").setAttribute("class",UV_dangerRating);


            var fiveDayForecast = document.querySelector(".five-day-forecast");
            fiveDayForecast.innerHTML = "";

            for (var i = 1; i < 6; i++)
            {


                var prototype = `
                    <span>${moment().add(i,"days").format("MM/DD/YYYY")}</span> 

                    <img src="${"https://openweathermap.org/img/wn/" + Data.daily[i].weather[0].icon + ".png"}">

                    <p>
                        Temp:
                        <span id="day-forecast-temperature">${Data.daily[i].temp.day}</span>
                    </p>

                    

                    <p>
                        Wind:
                        <span id="day-forecast-wind">${Data.daily[i].wind_speed}</span>
                    </p>

                    <p>
                        Humidity:
                        <span id="day-forecast-humidity">${Data.daily[i].humidity}</span>
                    </p>`;
                
                var newEL = document.createElement("div");
                newEL.setAttribute("class","card col-2 day-forecast")
                newEL.innerHTML = prototype;
                fiveDayForecast.appendChild(newEL);
            }
            
            console.log(Data);
        })
    })
}

renderSearchHistory();

document.addEventListener("submit",function (event)
{
    event.preventDefault();

    var searchEl = document.querySelector("input");

    if (searchEl.value == "") return;

    
    var searched = JSON.parse(localStorage.getItem("previouslySearched"));
    if (searched == null)
        searched = [];

    searched.push(searchEl.value);

    localStorage.setItem("previouslySearched",JSON.stringify(searched));
    renderSearchHistory();

    searchCityName(searchEl.value);
})