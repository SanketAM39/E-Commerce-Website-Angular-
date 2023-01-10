import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent implements OnInit {
  constructor(private api: ApiService) {}

  ordersResponse: any;
  totalOrders: any; // Saving total orders history

  address: string = "";
  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.api.get("/shop/orders").subscribe({
      next: (res: any) => {
        // console.log(res);
        this.ordersResponse = res;
        this.totalOrders = res.results;
        console.log(this.totalOrders[0]);
        console.log(this.totalOrders);
        // this.address =
      },
      error: (err) => {
        console.log(err);
        alert("Error");
      },
    });
  }
}
