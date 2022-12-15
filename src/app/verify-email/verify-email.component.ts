import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements OnInit {
  token: string | undefined;
  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  /* Subscribing to the query params and getting the token from the url. */

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((data: any) => {
      this.token = data.token;

      this.api
        .post(`/auth/verify-email?token=${this.token}`, null)
        .subscribe((data: any) => {
          console.log(data);

          this.router.navigateByUrl('/my-profile');
        });
    });
  }
}
