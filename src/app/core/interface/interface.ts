export interface CityWeather {
  cityName: string;
  temperature: number;
  description: string;
  humidity: string;
  wind: string;
  sunrise: number;
  sunset: number;
  date: number;
  icon: string;
}
export interface CityWeatherResponse {
  list: Forecast[];
}
export interface CityWeatherByName {
  list: Forecast[];
}

export interface Forecast {
  temperature: number;
  description: string;
  humidity: string;
  wind: string;
  sunrise: number;
  sunset: number;
  date: number;
  icon: string;
}
