import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForecastComponent } from './forecast/forecast.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    WeatherComponent,
    WeatherInfoComponent,
    DetailsComponent,
    ForecastComponent,
    CityWeatherComponent,
  ],
  providers: [],
})
export class WeatherModule {}
