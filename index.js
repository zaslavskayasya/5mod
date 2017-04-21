(function() {
navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var current_info = document.getElementById('current_info');
    var actualWeather_top = document.getElementById('current_header_list');
    var forecast = document.getElementById('forecast');
    var li =  document.createElement("li");
    var ul =  document.createElement("ul");
    li.className = "actual_li";


fetch('http://api.openweathermap.org/data/2.5/weather?lat=' +lat+ '35&lon=' +lon+ '&APPID=10f85ac758b2669f8007875b727e20f8&units=metric&lang=ua' )
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            response.json().then(function(data) {

                actualWeather_top.insertAdjacentHTML("afterBegin",
                    "<li class='current_header_item' id='top_list1'></li>" +
                    "<li class='current_header_item' id='top_list2'></li>" +
                    "<li class='current_header_item' id='top_list3'></li>");

                var weather_icon_url = "http://openweathermap.org/img/w/" + data.weather[0].icon;

                document.getElementById('top_list1').innerHTML =  data.name;
                document.getElementById('top_list2').innerHTML =  "<img id='weather_icon' src='"+ weather_icon_url +".png' >" ;
                document.getElementById('top_list3').innerHTML =  data.main.temp + ' &deg C';

                current_info.innerHTML = '<div>'
                    + data.weather[0].description +
                        ' , '
                    + '<span> вiтер: </span>'+
                    + data.wind.speed +
                        'м/с'+
                    ' </div>'

                console.log(data);
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

    fetch('http://api.openweathermap.org/data/2.5/forecast/daily?lat=' +lat+ '35&lon=' +lon+ '&APPID=10f85ac758b2669f8007875b727e20f8&units=metric&lang=ua')
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(function(data) {
                    console.log(data);

                    for (var i = 0; i < 4; i++) {
                        forecast.appendChild(ul);
                        var weather_icons_url = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon;;
                        forecast.insertAdjacentHTML("afterBegin",
                            "<ul><li id='fli1'></li>" +
                            "<li id='fli2'></li>" +
                            "<li id='fli3'></li>" +
                            "<li id='fli4'></li>" +
                            "</ul>");


                        var dat = new Date(data.list[i].dt * 1000);
                        moment.locale();
                        var parsedDat = moment(dat).format('L');

                        document.getElementById('fli1').innerHTML =  parsedDat;
                        document.getElementById('fli2').innerHTML =  "<img  src='"+ weather_icons_url +".png' >"
                        document.getElementById('fli3').innerHTML =  data.list[i].weather[0].description;
                        document.getElementById('fli4').innerHTML =  data.list[i].temp.day + ' &deg C';
                    }
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });


});


})();

function forecastOn() {

    var btn = document.getElementById('forecast');
    var toggleStatus = document.getElementById('showHide');


    console.log(toggleStatus);
    btn.classList.toggle("forecast");

    toggleStatus.innerHTML=(toggleStatus.innerHTML=='Прогноз')? 'Скрыть': 'Прогноз';


};