type all_data = GeolocationPosition 
type time = string 
type date = string 
type latitude = number 
type longitude = number 

type Name = {
  fName: string;
  lName: string;
};

type UserData = {
  id: number;
  name: Name;
  email: string;
  password: string;
};

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number; deg: number; gust: number };
  sys: { country: string };
}
