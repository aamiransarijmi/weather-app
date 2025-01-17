import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<void>();
  loginForm: FormGroup;
  showPassword = false;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit() {
    this.setUPForm();
  }

  setUPForm() {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          ),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  login(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.spinnerService.addToLoader('login');
      const { email, password } = this.loginForm.value;

      this.authService
        .login(email, password)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.spinnerService.removeFromLoader('login');
            if (response.success) {
              this.authService.setLoginStatus(true, response.token);
              this.router.navigate(['/dashboard']);
              this.toastrService.success(response.message);
            } else {
              this.toastrService.error(response.message);
            }
          },
          error: (err) => {
            this.spinnerService.removeFromLoader('login');
            this.toastrService.error('An error occurred while logging in.');
            console.error(err);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
