import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { Route, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ApiService } from "src/app/services/api.service";
import {
  clearCart,
  decreCount,
  increCount,
  removeFromCart,
  sumUpTotalAmount,
} from "src/app/store/actions/actions";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cartProducts: any;
  totalPrice: number = 0;
  item!: {
    productId: number;
    name: string;
    price: number;
    qty: number;
    subTotal: number;
  };

  orders = {
    items: [],
    deliveryFee: 50,
    total: 0,
    address: {},
  };

  constructor(
    private store: Store<{ cart: { cart: any; totalAmount: any } }>,
    private api: ApiService,
    private router: Router
  ) {
    this.store.select("cart").subscribe((data) => {
      this.cartProducts = data.cart;
      this.orders.items = data.cart;
      console.log(this.orders);
      this.totalPrice = data.totalAmount;
      this.orders.total = data.totalAmount;
    });
  }
  ngOnInit(): void {
    this.store.dispatch(sumUpTotalAmount());
    this.getAddresses();
  }

  getAddresses() {
    this.api.get("/customers/address").subscribe({
      next: (res: any) => {
        console.log(res);
        this.orders.address = res[0];
        console.log(this.orders);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  increseProductCount(product: any) {
    this.store.dispatch(increCount({ product: product }));
    this.store.dispatch(sumUpTotalAmount());
  }

  decreseProductCount(product: any) {
    this.store.dispatch(decreCount({ product: product }));
    this.store.dispatch(sumUpTotalAmount());
  }

  removeFromCart(product: any) {
    this.store.dispatch(removeFromCart({ product: product }));
  }

  emptyCart() {
    alert("your cart will get empty");
    this.store.dispatch(clearCart());
  }

  placeOrder() {
    console.log(this.orders);
    let temp = localStorage.getItem("customer-token");
    if (this.orders.items.length > 0 && temp) {
      this.api.post("/shop/orders", this.orders).subscribe({
        next: (res: any) => {
          console.log(res);
          alert("Success!");
          this.router.navigateByUrl(`customer/orders/payment/${res.order._id}`);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (!temp) {
      alert("Please Login First...");
    } else {
      alert("Add Items to Cart!");
    }
  }
}
