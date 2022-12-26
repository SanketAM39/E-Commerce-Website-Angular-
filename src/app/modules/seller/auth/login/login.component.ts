import { ApiService } from "./../../../../services/api.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SharedService } from "src/app/services/shared/shared.service";
import { HotToastService } from "@ngneat/hot-toast";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private shared: SharedService,
    private toast: HotToastService
  ) {}

  loginForm!: FormGroup;
  todayDate = new Date();
  showHidePassToggle = "password";
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["sanket@angularminds.in"],
      password: ["sanket898"],
      captcha: ["captcha-token"],
    });
  }

  showPassToggle() {
    if (this.showHidePassToggle === "password") {
      this.showHidePassToggle = "text";
    } else {
      this.showHidePassToggle = "password";
    }
  }

  handleSubmit() {
    console.log(this.loginForm.value);
    this.api.post("/auth/login", this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        // this.toast.success("Login Successfully!", {});
        localStorage.setItem("User-Token", res.token);
        this.loginForm.reset();
        localStorage.getItem("User-Token") &&
          this.router.navigate(["seller/my-profile"]);
        this.shared.getData(res.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handlePassChange() {
    delete this.loginForm.value.password;
    console.log(this.loginForm.value);
    this.api.post("/auth/forgot-password", this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
