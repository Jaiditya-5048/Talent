"use strict";
window.onload = function () {
    const loggedInUser = JSON.parse(localStorage.getItem('logginUser'));
    console.log(loggedInUser);
    currentLocationData();
};
async function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const date = new Date();
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                };
                const timeOptions = {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                };
                resolve({
                    all_data: position,
                    time: date.toLocaleTimeString('en-US', timeOptions),
                    date: date.toLocaleDateString('en-us', options),
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }, (error) => reject(error));
        }
        else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
}
async function getWeatherData(latitude, longitude) {
    const appid = 'ac0060d9268737b9a39758878ad38c54';
    const units = 'metric';
    try {
        const params = new URLSearchParams({
            lat: latitude.toString(),
            lon: longitude.toString(),
            appid: appid,
            units: units
        });
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?' + params);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching user data:', error);
        return [];
    }
}
// Function to use the location data
async function currentLocationData() {
    const { all_data, time, date, latitude, longitude } = await getLocation();
    const weatherData = await getWeatherData(latitude, longitude);
    console.log('data: ', weatherData);
    const city = weatherData.name;
    fillTimeBox(time, date, city);
    fillMainBox(weatherData);
    // const city = document.getElementById('city') as HTMLParagraphElement;
    // city.innerText = weatherData.name;
    // const currentTime = document.getElementById('time') as HTMLParagraphElement;
    // currentTime.innerText = time;
    // const currentDate = document.getElementById('date') as HTMLParagraphElement;
    // currentDate.innerText = date;
    // console.log(all_data);
    // console.log(time);
    // console.log(date);
    // console.log(latitude);
    // console.log(longitude);
}
function fillTimeBox(time, date, city) {
    const currentTime = document.getElementById('time');
    currentTime.innerText = time;
    const currentDate = document.getElementById('date');
    currentDate.innerText = date;
    const currentcity = document.getElementById('city');
    currentcity.innerText = city;
}
function fillMainBox(weatherData) {
    const currentTemp = document.getElementById('temp');
    const currentFeelsLikeTemp = document.getElementById('feels-like-temp');
    const currentSunrise = document.getElementById('sunrise');
    const currentSunset = document.getElementById('sunset');
    const currentWeather = document.getElementById('current-weather');
    const currentHumidity = document.getElementById('humidity');
    const currentWindSpeed = document.getElementById('wind-speed');
    const currentPressure = document.getElementById('pressure');
    const currentUV = document.getElementById('UV');
    currentTemp.innerText = weatherData.main.temp.toString();
    currentFeelsLikeTemp.innerHTML = weatherData.main.feels_like.toString();
}
