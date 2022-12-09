import { ApiService } from './../../../services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  loginForm!: FormGroup;
  todayDate = new Date();
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['sanket@angularminds.in'],
      password: ['sanket898'],
      captcha: ['captcha-token'],
    });
  }

  handleSubmit() {
    console.log(this.loginForm.value);
    this.api.post('/auth/login', this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('User-Token', res.token);
        this.loginForm.reset();
        localStorage.getItem('User-Token') &&
          this.router.navigate(['/my-profile']);
      },
      error: (err) => {
        console.log(err);
        alert('Error While Login');
      },
    });
  }
  handlePassChange() {
    delete this.loginForm.value.password;
    console.log(this.loginForm.value);
    this.api.post('/auth/forgot-password', this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
