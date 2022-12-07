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
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['sanket@angularminds.in'],
      password: ['sanket898'],
    });
  }

  handleSubmit() {
    console.log(this.loginForm.value);
    this.api.post('/auth/login?captcha=false', this.loginForm.value).subscribe({
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
}
