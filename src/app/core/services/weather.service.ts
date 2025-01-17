import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from '../const/apiUrl';
import { BehaviorSubject } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { TEMPERATURE_TYPE_VALUE } from '../interface/enum';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private temperatureType = new BehaviorSubject<boolean>(
    !!sessionStorage.getItem('temperatureType')
  );
  public temperatureType$ = this.temperatureType.asObservable();
  type: string;

  readonly TEMPERATURE_VALUE = TEMPERATURE_TYPE_VALUE;
  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionStorageService
  ) {
    this.type = this.sessionService.get('temperatureType')
      ? this.TEMPERATURE_VALUE.METRIC
      : this.TEMPERATURE_VALUE.IMPERIAL;
  }

  getWeather(location: string) {
    return this.httpClient.get(
      `${API_URLS.WEATHER_API_BY_CITY(location, this.type)}`
    );
  }

  getForecastByCity(location: string) {
    return this.httpClient.get(
      `${API_URLS.FORECAST_API_BY_CITY(location, this.type)}`
    );
  }

  public setTemperatureType(type) {
    this.temperatureType.next(type);
    sessionStorage.setItem('temperatureType', type);
  }
}
