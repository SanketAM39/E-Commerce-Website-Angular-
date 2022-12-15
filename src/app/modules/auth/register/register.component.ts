import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: ApiService) {}

  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      company: [''],
      password: [''],
      confirmPassword: [''],
      captcha: ['captcha-token'],
    });
  }

  handleSubmit() {
    console.log(this.registerForm.value);
    delete this.registerForm.value.confirmPassword;
    this.api.post('/auth/register', this.registerForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
