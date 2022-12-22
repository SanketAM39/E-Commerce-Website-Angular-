import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["sanket@yahoo.com", Validators.required],
      password: ["sanket898", Validators.required],
    });
  }

  handleLogin() {
    console.log(this.loginForm.value);
    this.api.post("/shop/auth/login", this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem("customer-token", res.token);
        this.router.navigate([""]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
