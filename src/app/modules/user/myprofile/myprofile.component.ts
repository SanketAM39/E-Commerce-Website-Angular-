import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css'],
})
export class MyprofileComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}
  userData: any = {
    isVerified: '',
    name: '',
    company: '',
    role: '',
    email: '',
  };
  ngOnInit() {
    this.api.get('/auth/self').subscribe({
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
    localStorage.setItem('User-Token', '');
    this.router.navigate(['auth/login']);
  }
}
