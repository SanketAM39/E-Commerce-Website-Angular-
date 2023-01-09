import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
})
export class OrderDetailsComponent implements OnInit {
  orderId!: string;
  orderDetails: any;
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data: any) => {
      this.orderId = data.orderId;
    });
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.api.get(`/shop/orders/${this.orderId}`).subscribe({
      next: (res) => {
        console.log(res);
        this.orderDetails = res;
      },
      error: (err) => {
        console.log(err);
        alert('Error!');
      },
    });
  }

  cancelOrder() {
    this.api.patch('/shop/orders/cancel/', this.orderId, null).subscribe({
      next: (res) => {
        console.log(res);
        alert('Order Cancelled ');
      },
      error: (err) => {
        console.log(err);
        alert('Error');
      },
    });
  }
}
