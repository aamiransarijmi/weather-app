import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';
import { Subject, takeUntil } from 'rxjs';
import { CityWeather } from '../../core/interface/interface';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
})
export class CityWeatherComponent implements OnInit, OnDestroy {
  @Input() weatherData: CityWeather;
  @Output() detail = new EventEmitter();
  isCelcicus: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.temperatureType$
      .pipe(takeUntil(this.destroy$))
      .subscribe((type) => (this.isCelcicus = type));
  }

  goToForecast() {
    this.detail.emit(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
