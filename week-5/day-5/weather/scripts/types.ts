type all_data = GeolocationPosition;
type time = string;
type date = string;
type latitude = number;
type longitude = number;

type loggedInUser = { 
  user_id: string; 
  fName: string; 
  loginFlag: boolean 
};

type Name = {
  fName: string;
  lName: string;
};

type UserData = {
  id: string;
  name: Name;
  email: string;
  password: string;
};

type WorldTimeAPIResponse = {
  timezone: string;
  datetime: string;
  date: string;
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  day_of_week: string;
};

// type WeatherData = {
//   main: {
//     temp: number;
//     feels_like: number;
//     pressure: number;
//     humidity: number;
//   };
//   weather: { main: string; description: string; icon: string }[];
//   wind: { speed: number; deg: number; gust: number };
//   sys: { country: string; sunrise: number; sunset: number };
//   timezone: number;
//   name: string;
// }

// interface WeatherDataHourly {
//   list: WeatherData[];
//   country: string;
//   population: number;
//   timezone: number;
//   sunrise: number;
//   sunset: number;
// }

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Temperature = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

type CurrentWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
};

type HourlyWeather = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  pop: number; // Probability of precipitation
};

type DailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain?: number; // Optional
  uvi: number;
};

type WeatherAPIResponse = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

type ReverseGeoAPIResponse = {
  name: string;
  lat: number;
  lon: number;
  country: string;
}[];

type GeoAPIResponse = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string; // Optional in case some responses don't have it
}[];

type ApiWhishlist = {
  id: string;
  fav_locations: string[];
};

// type Weather = {
//   id: number;
//   main: string;
//   description: string;
//   icon: string;
// };

// type Current = {
//   dt: number;
//   sunrise: number;
//   sunset: number;
//   temp: number;
//   feels_like: number;
//   pressure: number;
//   humidity: number;
//   dew_point: number;
//   uvi: number;
//   clouds: number;
//   visibility: number;
//   wind_speed: number;
//   wind_deg: number;
//   wind_gust: number;
//   weather: Weather[];
// };

// // type LocationData = {
// //   lat: number;
// //   lon: number;
// //   timezone: string;
// //   timezone_offset: number;
// // };

// type WeatherData = {
//   lat: number;
//   lon: number;
//   timezone: string;
//   timezone_offset: number;
//   current : Current;
//   hourly: Current[];
//   daily:

// }

// type Temperature = {
//   day: number;
//   min: number;
//   max: number;
//   night: number;
//   eve: number;
//   morn: number;
// };

// type FeelsLike = {
//   day: number;
//   night: number;
//   eve: number;
//   morn: number;
// };

// type Weather = {
//   id: number;
//   main: string;
//   description: string;
//   icon: string;
// };

// type DailyWeather = {
//   dt: number;
//   sunrise: number;
//   sunset: number;
//   moonrise: number;
//   moonset: number;
//   moon_phase: number;
//   summary: string;
//   temp: Temperature;
//   feels_like: FeelsLike;
//   pressure: number;
//   humidity: number;
//   dew_point: number;
//   wind_speed: number;
//   wind_deg: number;
//   wind_gust: number;
//   weather: Weather[];
//   clouds: number;
//   pop: number; // Probability of precipitation
//   rain?: number; // Optional, since it may not always be present
//   uvi: number;
// };
