import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import { WeatherService } from '../../../core/services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  isLogin = false;
  isCelcicus: boolean;

  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private authService: AuthService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.authService.isLogin$
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => (this.isLogin = status));

    this.weatherService.temperatureType$
      .pipe(takeUntil(this.destroy$))
      .subscribe((type) => (this.isCelcicus = type));
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  action(): void {
    if (this.isLogin) {
      this.authService.setLoginStatus(false);
      this.router.navigate(['/auth']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  changeType() {
    this.isCelcicus = !this.isCelcicus;
    this.weatherService.setTemperatureType(this.isCelcicus);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
