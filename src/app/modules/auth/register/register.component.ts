import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  registerForm!: FormGroup;
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      company: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  handleSubmit() {
    console.log(this.registerForm);
    console.log(this.registerForm.value);
  }
}
