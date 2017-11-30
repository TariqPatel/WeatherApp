
var x = document.getElementById("mainContent");

$(window).load(function () {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    $(".fa").hide();
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "139&APPID=53f9d8e4213222cf517d86dc406d67fc", function (data) {
        $(".locationName").text("Location: " + data["name"]);
        $(".weatherDescription").text("Weather: " + data.weather[0].description);
        $(".temp").text("Temperature: " + data["main"]["temp"]);
        $(".pressure").text("Pressure: " + data["main"]["pressure"]);
        $(".humidity").text("Humidity: " + data["main"]["humidity"]);
        $(".icon").text("Weather: " + data.weather[0].icon);
        $(".icon").attr("src","http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}