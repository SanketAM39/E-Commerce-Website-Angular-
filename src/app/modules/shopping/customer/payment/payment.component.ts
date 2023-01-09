import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  orderId!: string;
  cardDetailsForm!: FormGroup;
  cardDetails: {} = {
    cardNumber: 5555555555554444,
    nameOnCard: 'Sanket Anandkar',
    expiry: '06/2023',
    cvv: 541,
  };
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.orderId = data.orderId;
      console.log(data);
    });
    this.cardDetailsForm = this.fb.group({
      nameOnCard: [],
      cardNumber: [],
      expiry: [],
      cvv: [],
    });
  }

  confirmPayment() {
    console.log(this.cardDetailsForm.value);
    console.log(this.orderId);
    this.api
      .put(`/shop/orders/confirm/`, this.orderId, this.cardDetails)
      .subscribe({
        next: (res) => {
          console.log(res);
          alert('Success!');
        },
        error: (err) => {
          console.log(err);
          alert('Error!');
        },
      });
  }
}
