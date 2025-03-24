"use strict";
window.onload = function () {
    load();
};
async function load() {
    const loggedInUser = JSON.parse(localStorage.getItem('logginUser') || 'null');
    if (loggedInUser === null) {
        window.location.href = '../public/log.html';
    }
    else {
        await fillData();
        const location = document.getElementById('city')?.textContent ?? 'Unknown';
        const whishlistClass = new Whishlist(loggedInUser.user_id, location);
        whishlistClass.checkHeartColor();
    }
}
document.getElementById('wishlist-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    const location = document.getElementById('city')?.textContent ?? 'Unknown';
    const loggedInUser = JSON.parse(localStorage.getItem('logginUser') || 'null');
    if (loggedInUser !== null) {
        const whishlistClass = new Whishlist(loggedInUser.user_id, location);
        whishlistClass.handleWhishlistBtn(e);
    }
});
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
async function fillData() {
    const { all_data, time, date, latitude, longitude } = await getLocation();
    const weatherData = await getWeatherData(latitude, longitude);
    const cityData = await getCityName(latitude, longitude);
    if (weatherData === undefined) {
        console.log('error fetching Data');
    }
    else {
        fillDateAndTimeBox(cityData, weatherData);
        fillMainBox(weatherData);
        fillHourlyBox(weatherData);
        fillFiveDaysBox(weatherData);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////
document.getElementById('search-bar')?.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' &&
        document.getElementById('search-bar').value.trim().length > 0) {
        event.preventDefault();
        serachBar();
    }
});
document.getElementById('search-form')?.addEventListener('submit', (event) => {
    if (document.getElementById('search-bar').value.trim().length > 0) {
        event.preventDefault();
        serachBar();
    }
});
async function serachBar() {
    const serachBar = document.getElementById('search-bar');
    const serachBarInput = serachBar.value.trim();
    const coordinates = await getCoordinates(serachBarInput);
    if (coordinates === undefined) {
        console.log('error fetching coordinates Data');
    }
    else {
        const [{ lat, lon }] = coordinates;
        const weatherData = await getWeatherData(lat, lon);
        const cityData = await getCityName(lat, lon);
        console.log(weatherData);
        if (weatherData === undefined) {
            console.log('error fetching weather Data');
        }
        else {
            fillDateAndTimeBox(cityData, weatherData);
            fillMainBox(weatherData);
            fillHourlyBox(weatherData);
            fillFiveDaysBox(weatherData);
            const loggedInUser = JSON.parse(localStorage.getItem('logginUser') || 'null');
            if (loggedInUser === null) {
                console.log('error finding user data');
            }
            else {
                const location = document.getElementById('city')?.textContent ?? 'Unknown';
                const whishlistClass = new Whishlist(loggedInUser.user_id, location);
                console.log('location:', location);
                whishlistClass.checkHeartColor();
            }
        }
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////
function UTCformat(timestamp, offset) {
    const date = new Date((timestamp + offset) * 1000);
    const fullDateTime = date.toUTCString();
    const dateTimeArr = fullDateTime.split(' ');
    const fulltime = dateTimeArr[4];
    const timeArr = fulltime.split(':');
    const timePeriod = (hour = timeArr[0]) => (Number(hour) >= 12 ? 'PM' : 'AM');
    const formatHours = (hour = timeArr[0]) => Number(hour) > 12 ? (Number(hour) - 12).toString() : hour;
    return {
        date: {
            weekday: dateTimeArr[0],
            day: dateTimeArr[1],
            month: dateTimeArr[2],
            year: dateTimeArr[3],
            time_code: dateTimeArr[4],
        },
        time: {
            hours: formatHours(),
            minutes: timeArr[1],
            second: timeArr[2],
            timePeriod: timePeriod(),
        },
    };
}
//Funtion to fill first(1) left box. date, time and city box
function fillDateAndTimeBox(cityData, weatherData) {
    const currentTime = document.getElementById('time');
    const currentDate = document.getElementById('date');
    const currentcity = document.getElementById('city');
    const { date, time } = UTCformat(weatherData.current.dt, weatherData.timezone_offset);
    const cityName = cityData.at(0)?.name ?? 'Unknown';
    currentTime.innerText = `${time.hours}:${time.minutes} ${time.timePeriod} `;
    currentDate.innerText = `${date.weekday} ${date.day} ${date.month}`;
    currentcity.innerText = cityName;
}
//Funtion to fill (2) main box with all the weather details
function fillMainBox(weatherData) {
    const currentTemp = document.getElementById('temp');
    // const currentFeelsLikeTemp = document.getElementById('feels-like-temp') as HTMLParagraphElement;
    const currentSunrise = document.getElementById('sunrise');
    const currentSunset = document.getElementById('sunset');
    const currentWeather = document.getElementById('current-weather');
    const currentHumidity = document.getElementById('humidity');
    const currentWindSpeed = document.getElementById('wind-speed');
    const currentPressure = document.getElementById('pressure');
    const currentUV = document.getElementById('UV');
    const mainWeatherIcon = document.getElementById('main-weather');
    const { current } = weatherData;
    const { time: sunrize } = UTCformat(current.sunrise, weatherData.timezone_offset);
    const { time: sunset } = UTCformat(current.sunset, weatherData.timezone_offset);
    console.log(current.weather[0].main);
    currentTemp.innerText = `${Math.floor(current.temp)}\u00B0C`;
    // currentFeelsLikeTemp.innerText = feels_like.toString();
    currentSunrise.innerText = `${sunrize.hours}:${sunrize.minutes} ${sunrize.timePeriod} `;
    currentSunset.innerText = `${sunset.hours}:${sunset.minutes} ${sunset.timePeriod} `;
    currentWeather.innerText = current.weather[0].main;
    mainWeatherIcon.src = `../resource/weather/${current.weather[0].main}.png`;
    currentHumidity.innerText = `${Math.floor(current.humidity)} %`;
    currentWindSpeed.innerText = `${Math.floor(current.wind_speed)} km/h`;
    currentPressure.innerText = `${Math.floor(current.pressure)} hPa`;
    currentUV.innerText = `${Math.floor(current.uvi)} hPa`;
}
//Funtion to fill (3) hourly Box
function fillHourlyBox(weatherData) {
    const { hourly } = weatherData;
    const hourlyFiltered = hourly.slice(1, 6);
    const hourlyDiv = document.getElementById('hourly-div');
    hourlyDiv.innerHTML = ' ';
    hourlyFiltered.forEach((hourlyFiltered) => {
        const { time } = UTCformat(hourlyFiltered.dt, weatherData.timezone_offset);
        const hourlyDivCell = `  <div class="flex flex-col items-center gap-3">
            <p>${time.hours}:${time.minutes} ${time.timePeriod}</p>
            <img class="max-h-12 max-w-12" src="../resource/weather/${hourlyFiltered.weather[0].main}.png" alt="">
            <p>${Math.floor(hourlyFiltered.temp)}\u00B0C</p>
            <img class="max-h-12 max-w-12" src="../resource/dashboard/wind-1.png" alt="">
            <p>${Math.floor(hourlyFiltered.wind_speed)} km/h</p>
          </div>`;
        hourlyDiv.innerHTML += hourlyDivCell;
    });
}
////Funtion to fill (4) five day Box
function fillFiveDaysBox(weatherData) {
    const { daily } = weatherData;
    const dailyFiltered = daily.slice(1, 6);
    const dailyDiv = document.getElementById('daily-div');
    dailyDiv.innerHTML = ' ';
    dailyFiltered.forEach((dailyFiltered) => {
        const { date } = UTCformat(dailyFiltered.dt, weatherData.timezone_offset);
        const hourlyDivCell = ` 
          <div class="grid grid-cols-3 place-items-center">
            <div>
              <img class="max-h-8" src="../resource/weather/${dailyFiltered.weather[0].main}.png" alt="">
            </div>
            <div>
              <p>${Math.floor(dailyFiltered.temp.day)}\u00B0C</p>
            </div>
            <div>
              ${date.weekday} ${date.day}
            </div>
            </div>`;
        dailyDiv.innerHTML += hourlyDivCell;
    });
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// whish-list code
//////////////////////////////////////////////////////////////////////////////////////////////////
// window.FlashMessage.success('Logged Out Successfully', { type: 'success', timeout: 200000 });
