const weatherData = {
  "coord": {
    "lon": 76.7281,
    "lat": 30.6812
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 23.4,
    "feels_like": 22.37,
    "temp_min": 23.4,
    "temp_max": 23.4,
    "pressure": 1011,
    "humidity": 22,
    "sea_level": 1011,
    "grnd_level": 976
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.65,
    "deg": 340,
    "gust": 4.4
  },
  "clouds": {
    "all": 0
  },
  "dt": 1742215161,
  "sys": {
    "country": "IN",
    "sunrise": 1742173252,
    "sunset": 1742216529
  },
  "timezone": 19800,
  "id": 6992326,
  "name": "Mohali",
  "cod": 200
};

const formatDateTime = (timestamp, timezoneOffset,) => {
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

const { sunrise, sunset } = weatherData.sys;
const [{ main: weatherMain, description, icon }] = weatherData.weather;

// const timezoneOffset = weatherData.timezone;
// const sunriseTime = formatDateTime(sunrise, timezoneOffset);
// console.log(sunriseTime);
console.log(weatherMain);

 