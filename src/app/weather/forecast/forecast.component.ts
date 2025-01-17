import { Component, Input, OnInit } from '@angular/core';
import { Forecast } from '../../core/interface/interface';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  @Input() forecast;
  @Input() isCelcicus: boolean;
  constructor() {}

  ngOnInit() {}
}
