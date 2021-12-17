
var openWeatherAPIKey = "d3c34b7336549ad0c93d9f257bcf99d9";


document.addEventListener("submit",function (event)
{
    event.preventDefault();

    var searchEl = document.querySelector("input");
    
    var urlRequest1 = 'https://geocode.xyz/' + searchEl.value +'?json=1' ;
    console.log(urlRequest1)
    fetch(urlRequest1)
    .then(function (response) {
        
        return response.json();
    })
    .then(function (data){
        console.log(data);


        var urlRequest2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.latt +"&lon="  + data.longt + "&appid="+openWeatherAPIKey;

        console.log(urlRequest2);

        fetch (urlRequest2)
        .then (function (response){
            return response.json();
        })
        .then (function (Data) {
            console.log(Data);
        })
    })
})