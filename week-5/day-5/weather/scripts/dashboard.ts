window.onload = function () {
  const loggedInUser = JSON.parse(localStorage.getItem('logginUser') as string);
  console.log(loggedInUser);
  currentLocationData();
};

async function getLocation(): Promise<{
  all_data: GeolocationPosition;
  time: string;
  date: string;
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const date = new Date();
          const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
          const timeOptions: Intl.DateTimeFormatOptions = {
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
        },
        (error) => reject(error),
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
}

async function fillData() {
  const { all_data, time, date, latitude, longitude } = await getLocation();
  const weatherData = await getWeatherData(latitude, longitude);
 
}

function fillTData(weatherData : WeatherAPIResponse) {
  []
}


// Function to use the location data
async function currentLocationData() {
  const { all_data, time, date, latitude, longitude } = await getLocation();
  const weatherData = await getWeatherData(latitude, longitude);
  console.log('data: ', weatherData);
  const city: string = weatherData.name;

  fillTimeBox(time, date, city);
  fillMainBox(weatherData);

}

function fillTimeBox(time: string, date: string, city: string) {
  const currentTime = document.getElementById('time') as HTMLParagraphElement;
  currentTime.innerText = time;

  const currentDate = document.getElementById('date') as HTMLParagraphElement;
  currentDate.innerText = date;

  const currentcity = document.getElementById('city') as HTMLParagraphElement;
  currentcity.innerText = city;
}

function fillMainBox(weatherData: WeatherData) {
  const currentTemp = document.getElementById('temp') as HTMLParagraphElement;
  // const currentFeelsLikeTemp = document.getElementById('feels-like-temp') as HTMLParagraphElement;
  const currentSunrise = document.getElementById('sunrise') as HTMLParagraphElement;
  const currentSunset = document.getElementById('sunset') as HTMLParagraphElement;
  const currentWeather = document.getElementById('current-weather') as HTMLParagraphElement;
  const currentHumidity = document.getElementById('humidity') as HTMLParagraphElement;
  const currentWindSpeed = document.getElementById('wind-speed') as HTMLParagraphElement;
  const currentPressure = document.getElementById('pressure') as HTMLParagraphElement;
  // const currentUV = document.getElementById('UV') as HTMLParagraphElement;

  const formatDateTime = (
    timestamp: number,
    timezoneOffset: number,
  ): { time: string; date: string } => {
    const localDate = new Date((timestamp + timezoneOffset) * 1000);

    return {
      time: localDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      date: localDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  };

  const { temp, feels_like, humidity, pressure } = weatherData.main;
  const [{ main: weatherMain, description, icon }] = weatherData.weather;
  const { speed } = weatherData.wind;
  const { sunrise, sunset } = weatherData.sys;
  const { timezone } = weatherData;

  const timezoneOffset = 1; //############check the offset it cusing error############
  //  weatherData.timezone;

  currentTemp.innerText = `${Math.floor(temp)}\u00B0C`;
  // currentFeelsLikeTemp.innerText = feels_like.toString();
  currentSunrise.innerText = formatDateTime(sunrise, timezoneOffset).time;
  currentSunset.innerText = formatDateTime(sunset, timezoneOffset).time;
  currentWeather.innerText = weatherMain;
  currentHumidity.innerText = `${Math.floor(humidity)}%`;
  currentWindSpeed.innerText = `${Math.floor(speed)} km/h`;
  currentPressure.innerText = `${Math.floor(pressure)} hPa`;
  // currentUV.innerText =
}

// function fillHourlyBox (weatherDataHourly) {

// }


