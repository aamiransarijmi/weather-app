import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  protected authenticated!: boolean;
  constructor(private router: Router, private authService: AuthService) {}

  public async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    this.authenticated = await this.authService.isLoggedIn();
    if (state.url.includes('/auth')) {
      if (this.authenticated) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    } else {
      if (!this.authenticated) {
        localStorage.clear();
        this.router.navigate(['/auth']);
        return false;
      } else {
        return true;
      }
    }
  }
}
