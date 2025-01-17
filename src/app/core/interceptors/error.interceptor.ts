import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {}),
      catchError((err) => {
        let error = '';
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
          location.reload();
        } else if (err.status === 400 || err.status < 500) {
          let errorMessage = err?.error?.message || '';
          this.toastrService.error(errorMessage);
        } else if (err.status >= 500 && err.status < 600) {
          let errorMessage = err?.error?.message || '';
          this.toastrService.error(errorMessage);
          error = 'Something went wrong!';
        } else {
          error = err || err.statusText;
          this.toastrService.error(err);
        }
        return throwError(() => error);
      })
    );
  }
}
