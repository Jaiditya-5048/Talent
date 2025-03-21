window.onload = function () {
  const loggedInUser = JSON.parse(localStorage.getItem('logginUser') as string);
  // console.log(loggedInUser);
  
  fillData();
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

function formatDateTime(timestamp: number, timezoneOffset: number): { time: string; date: string } {
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
}

async function fillData() {
  const { all_data, time, date, latitude, longitude } = await getLocation();
  const weatherData = await getWeatherData(latitude, longitude);
  const cityData = await getCityName(latitude, longitude);
  const timezoneOffset = 1;



  if (weatherData === undefined) {
    console.log('error fetching weather Data');
  } else {
    const { current } = weatherData;
    const { time, date } = formatDateTime(current.dt, timezoneOffset);

    fillDateAndTimeBox(cityData, time, date);
    fillMainBox(weatherData);
    fillHourlyBox(weatherData);
    fillFiveDaysBox(weatherData);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('search-bar')?.addEventListener('keypress', (event: KeyboardEvent) => {
  if (
    event.key === 'Enter' &&
    (document.getElementById('search-bar') as HTMLInputElement).value.trim().length > 0
  ) {
    serachBar();
  }
});



async function serachBar() {
  const serachBar = document.getElementById('search-bar') as HTMLInputElement;
  const serachBarInput = serachBar.value.trim();
  const coordinates = await getCoordinates(serachBarInput);
  const timezoneOffset = 1;

  if (coordinates === undefined) {
    console.log('error fetching coordinates Data');
  } else {
    const [ {lat, lon} ] = coordinates;
    const weatherData = await getWeatherData(lat, lon);
    const cityData = await getCityName(lat, lon);
    console.log(weatherData);

    if (weatherData === undefined) {
      console.log('error fetching weather Data');
    } else {
      const { current } = weatherData;
      const { time, date } = formatDateTime(current.dt, timezoneOffset);

      fillDateAndTimeBox(cityData, time, date);
      fillMainBox(weatherData);
      fillHourlyBox(weatherData);
      fillFiveDaysBox(weatherData);
    }
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////

//Funtion to fill first(1) left box. date, time and city box
function fillDateAndTimeBox(cityData: ReverseGeoAPIResponse, time: string, date: string) {
  const currentTime = document.getElementById('time') as HTMLParagraphElement;
  const currentDate = document.getElementById('date') as HTMLParagraphElement;
  const currentcity = document.getElementById('city') as HTMLParagraphElement;

  const cityName = cityData.at(0)?.name ?? 'Unknown';

  currentTime.innerText = time;
  currentDate.innerText = date;
  currentcity.innerText = cityName;
}

//Funtion to fill (2) main box with all the weather details
function fillMainBox(weatherData: WeatherAPIResponse) {
  const currentTemp = document.getElementById('temp') as HTMLParagraphElement;
  // const currentFeelsLikeTemp = document.getElementById('feels-like-temp') as HTMLParagraphElement;
  const currentSunrise = document.getElementById('sunrise') as HTMLParagraphElement;
  const currentSunset = document.getElementById('sunset') as HTMLParagraphElement;
  const currentWeather = document.getElementById('current-weather') as HTMLParagraphElement;
  const currentHumidity = document.getElementById('humidity') as HTMLParagraphElement;
  const currentWindSpeed = document.getElementById('wind-speed') as HTMLParagraphElement;
  const currentPressure = document.getElementById('pressure') as HTMLParagraphElement;
  const currentUV = document.getElementById('UV') as HTMLParagraphElement;

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

  const { current } = weatherData;

  const timezoneOffset = 1; //############check the offset it cusing error############
  //  weatherData.timezone;

  currentTemp.innerText = `${Math.floor(current.temp)}\u00B0C`;
  // currentFeelsLikeTemp.innerText = feels_like.toString();
  currentSunrise.innerText = formatDateTime(current.sunrise, timezoneOffset).time;
  currentSunset.innerText = formatDateTime(current.sunset, timezoneOffset).time;
  currentWeather.innerText = current.weather[0].main;
  currentHumidity.innerText = `${Math.floor(current.humidity)} %`;
  currentWindSpeed.innerText = `${Math.floor(current.wind_speed)} km/h`;
  currentPressure.innerText = `${Math.floor(current.pressure)} hPa`;
  currentUV.innerText = `${Math.floor(current.uvi)} hPa`;
}

//Funtion to fill (3) hourly Box
function fillHourlyBox(weatherData: WeatherAPIResponse) {
  const { hourly } = weatherData;
  const hourlyFiltered = hourly.slice(1, 6);
  // console.log(hourlyFiltered);

  const formatTime = (timestamp: number): { time: string } => {
    const localDate = new Date(timestamp * 1000);

    return {
      time: localDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
    };
  };

  const hourlyDiv = document.getElementById('hourly-div') as HTMLDivElement;
  hourlyDiv.innerHTML = " "

  hourlyFiltered.forEach((hourlyFiltered) => {
    const hourlyDivCell = `  <div class="flex flex-col items-center gap-3">
            <p>${formatTime(hourlyFiltered.dt).time}</p>
            <img class="max-h-12 max-w-12" src="../resource/dashboard/sun.png" alt="">
            <p>${hourlyFiltered.temp}</p>
            <img class="max-h-12 max-w-12" src="../resource/dashboard/wind-1.png" alt="">
            <p>${hourlyFiltered.wind_speed} km/h</p>
          </div>`;

    hourlyDiv.innerHTML += hourlyDivCell;
  });
}

////Funtion to fill (4) five day Box
function fillFiveDaysBox(weatherData: WeatherAPIResponse) {
  const { daily } = weatherData;
  const dailyFiltered = daily.slice(1, 6);
  // console.log(dailyFiltered);

  const formatDate = (timestamp: number): { date: string } => {
    const localDate = new Date(timestamp * 1000);

    return {
      date: localDate.toLocaleDateString('en-US', {
        weekday: 'long',
        // year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
  };

  const dailyDiv = document.getElementById('daily-div') as HTMLDivElement;
  dailyDiv.innerHTML = " "

  dailyFiltered.forEach((dailyFiltered) => {
    const hourlyDivCell = ` 
          <div class="grid grid-cols-3 place-items-center">
            <div>
              <img class="max-h-10" src="../resource/dashboard/cloudy-1.png" alt="">
            </div>
            <div>
              <p>${dailyFiltered.temp.day}</p>
            </div>
            <div>
              ${formatDate(dailyFiltered.dt).date}
            </div>
          </div>`;

    dailyDiv.innerHTML += hourlyDivCell;
  });
}
