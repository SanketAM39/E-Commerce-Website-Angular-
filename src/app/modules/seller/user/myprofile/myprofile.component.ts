import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HotToastService } from "@ngneat/hot-toast";
import { ApiService } from "src/app/services/api.service";
import { SharedService } from "src/app/services/shared/shared.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-myprofile",
  templateUrl: "./myprofile.component.html",
  styleUrls: ["./myprofile.component.css"],
})
export class MyprofileComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private shared: SharedService,
    private toast: HotToastService
  ) {}
  userData: any = {
    isVerified: "",
    name: "",
    company: "",
    role: "",
    email: "",
  };
  ngOnInit() {
    this.api.get("/auth/self").subscribe({
      next: (res: any) => {
        console.log(res);
        this.userData.isVerified = res.isEmailVerified;
        this.userData.name = res.name;
        this.userData.company = res._org.name;
        this.userData.role = res.role;
        this.userData.email = res.email;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logOut() {
    Swal.fire({
      title: "Are you sure?",
      text: "Tussi na Jao!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("User-Token", "");
        this.router.navigate(["seller/auth/login"]);
      }
    });
  }

  verifyEmail() {
    this.api
      .post("/auth/send-verification-email", null)
      .subscribe((data: any) => {
        // alert("Email sent");
      });
  }
}
