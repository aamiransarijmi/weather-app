import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { MustMatch } from '../../core/helper/must-match.validator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LOGIN_RESPONSE } from '../../core/const/loginResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  private destroyed$ = new Subject<void>();
  registerForm: FormGroup;
  show = {
    password: false,
    confirm: false,
  }; // Property to track password visibility

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setUPForm();
  }

  setUPForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            ),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  togglePasswordVisibility() {
    this.show.password = !this.show.password; // Toggle visibility
  }

  toggleConfirmPasswordVisibility() {
    this.show.confirm = !this.show.confirm; // Toggle visibility
  }

  register() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;
      const response = this.authService.register(payload);
      if (response.success) {
        this.router.navigate(['/dashboard']);
        this.authService.setLoginStatus(true, response.token);
        this.toastrService.success(response.message);
      }
    }
  }
}
