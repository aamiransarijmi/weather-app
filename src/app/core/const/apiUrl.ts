import { environment } from '../../../environments/environment';

export const API_URLS = {
  // Auth API
  WEATHER_API_BY_CITY: (city: string, type: string) =>
    `${environment.apiUrl}/data/2.5/weather?q=${city}&units=${type}&APPID=${environment.weatherApiId}`,

  FORECAST_API_BY_CITY: (city: string, type: string) =>
    `${environment.apiUrl}/data/2.5/forecast/daily?q=${city}&APPID=${environment.forecastApiId}&units=${type}&cnt=16`,

  WEATHER_ICON: (icon: number) =>
    `${environment.apiImageUrl}/img/wn/${icon}.png`,
};
