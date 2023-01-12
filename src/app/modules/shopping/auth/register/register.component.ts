import { ApiService } from "./../../../../services/api.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  customerRegisterForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.customerRegisterForm = this.fb.group({
      name: [""],
      email: [""],
      address: this.fb.group({
        street: [""],
        addressLine2: [""],
        city: [""],
        state: [""],
        pin: [""],
      }),
      password: [""],
    });
  }
  handleRegister() {
    console.log(this.customerRegisterForm.value);
    this.api
      .post("/shop/auth/register", this.customerRegisterForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(["/auth/login"]);
        },
        error: (err) => {
          console.log(err);
          alert("Error");
        },
      });
  }
}
