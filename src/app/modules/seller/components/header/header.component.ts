import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private api: ApiService,
    private shared: SharedService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  flag: boolean = false;

  loggedUser!: any;
  changePasswordToggle!: any;
  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    if (this.router.url.includes('my-profile')) {
      this.flag = true;
    } else {
      this.flag = false;
    }
    this.api.get('/auth/self').subscribe({
      next: (res: any) => {
        this.loggedUser = res.name;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.changePasswordForm = this.fb.group({
      old_password: [''],
      new_password: [''],
    });
  }

  changePassword() {
    this.changePasswordToggle = true;
  }
  changeOldPassword() {
    this.api
      .post('/users/auth/change-password', this.changePasswordForm.value)
      .subscribe({
        next: (res: any) => {
          console.log('Change Password Response :', res);
          alert('Change Password Successfully!');
          this.changePasswordToggle = false;
        },
        error: (err: any) => {
          console.log('Change Password Error :', err);
        },
      });
  }
}
