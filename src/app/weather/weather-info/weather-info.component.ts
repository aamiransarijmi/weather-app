import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WeatherService } from '../../core/services/weather.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpinnerService } from '../../core/services/spinner.service';
import { CityWeather } from '../../core/interface/interface';
import { TEMPERATURE_TYPE_VALUE } from '../../core/interface/enum';
import { API_URLS } from '../../core/const/apiUrl';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit, OnDestroy {
  public weatherForm: FormGroup;
  public weatherData: CityWeather;

  readonly TEMPERATURE_VALUE = TEMPERATURE_TYPE_VALUE;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private weatherService: WeatherService,
    private router: Router,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.weatherForm = this.formBuilder.group({
      location: ['', [Validators.required]],
    });

    this.weatherService.temperatureType$
      .pipe(takeUntil(this.destroy$))
      .subscribe((m) => {
        this.weatherService.type = m
          ? this.TEMPERATURE_VALUE.METRIC
          : this.TEMPERATURE_VALUE.IMPERIAL;
        this.weatherInfo();
      });
  }

  weatherInfo(buttonClick: boolean = false): void {
    this.weatherData = null;
    if (buttonClick) this.weatherForm.markAllAsTouched();
    if (this.weatherForm.valid) {
      this.spinnerService.addToLoader('weatherInfo');
      const cityName = this.weatherForm.get('location')?.value;
      this.weatherService
        .getWeather(cityName)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.weatherData = {
              cityName: res['name'],
              temperature: Math.round(res['main'].temp),
              description:
                res['weather'][0]?.main +
                ' , ' +
                res['weather'][0]?.description,
              humidity: res['main']?.humidity,
              wind: res['wind']?.speed,
              sunrise: res['sys'].sunrise * 1000,
              sunset: res['sys'].sunset * 1000,
              date: res['dt'] * 1000,
              icon: API_URLS.WEATHER_ICON(res['weather'][0]?.icon),
            };
            this.spinnerService.removeFromLoader('weatherInfo');
          },
          error: (error) => {
            console.error('Error fetching weather data:', error);
            this.spinnerService.removeFromLoader('weatherInfo');
          },
        });
    }
  }

  modifyRes(res) {}

  detail(): void {
    const cityName = this.weatherForm.get('location')?.value;
    if (cityName) {
      this.router.navigate([`/details/${cityName}`]);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
