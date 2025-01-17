import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../../core/services/weather.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  CityWeatherByName,
  CityWeatherResponse,
} from '../../core/interface/interface';
import { TEMPERATURE_TYPE_VALUE } from '../../core/interface/enum';
import { API_URLS } from '../../core/const/apiUrl';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  cityName: string = '';
  weatherData: CityWeatherByName;
  isCelcicus: boolean = false;
  readonly TEMPERATURE_VALUE = TEMPERATURE_TYPE_VALUE;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private weatherService: WeatherService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe({
      next: (params: any) => {
        const newCityName = params['name'];
        if (newCityName && newCityName !== this.cityName) {
          this.cityName = newCityName;
          this.cityForecast();
        }
      },
      error: (err) => console.error('Error fetching route params:', err),
    });
    this.weatherService.temperatureType$
      .pipe(takeUntil(this.destroy$))
      .subscribe((m) => {
        const newType = m
          ? this.TEMPERATURE_VALUE.METRIC
          : this.TEMPERATURE_VALUE.IMPERIAL;

        if (this.weatherService.type !== newType) {
          this.weatherService.type = newType;
          if (this.cityName) {
            this.cityForecast();
          }
        }
      });
  }

  cityForecast(): void {
    this.spinnerService.addToLoader('cityForecast');
    this.weatherService
      .getForecastByCity(this.cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: CityWeatherResponse) => {
          this.weatherData = {
            ...res,
            list: res.list.map((item) => ({
              ...item,
              description:
                item['weather'][0]?.main +
                ' , ' +
                item['weather'][0]?.description,
              humidity: item['humidity'],
              wind: item['wind'],
              icon: API_URLS.WEATHER_ICON(item['weather'][0]?.icon),
              date: item['dt'] * 1000,
            })),
          };
          this.spinnerService.removeFromLoader('cityForecast');
        },
        error: (err) => {
          console.error('Error fetching weather forecast:', err);
          this.spinnerService.removeFromLoader('cityForecast');
        },
      });
  }

  goToBack(): void {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
