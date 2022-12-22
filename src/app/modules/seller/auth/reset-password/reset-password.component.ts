import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  token: any;
  resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.token = data.token;
    });

    this.resetPasswordForm = this.fb.group({
      password: [''],
    });
  }

  resetPassword() {
    this.api
      .post(
        `/auth/reset-password?token=${this.token}`,
        this.resetPasswordForm.value
      )
      .subscribe({
        next: (res) => {
          console.log('Reset', res);
          alert('Reset Password Successful!');
          this.router.navigateByUrl('');
        },
        error: (err) => {
          console.log(err);
          alert('Error');
        },
      });
  }
}
