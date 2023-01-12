import { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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
  ans: any = JSON.parse(localStorage.getItem("cart-products")!);
  totalPrice: number = 0;
  temp: any = localStorage.getItem("customer-token" || null);
  modalToggle = "Login";

  loginForm!: FormGroup;
  customerRegisterForm!: FormGroup;

  orders = {
    items: [],
    deliveryFee: 50,
    total: 0,
    address: {},
  };

  constructor(
    private store: Store<{ cart: { cart: any; totalAmount: any } }>,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder
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
    this.ans = JSON.parse(localStorage.getItem("cart-products")!);
    console.log(this.ans);
    this.store.dispatch(sumUpTotalAmount());
    if (this.temp) {
      this.getAddresses();
    }
    this.loginForm = this.fb.group({
      email: ["sanket@yahoo.com", Validators.required],
      password: ["sanket898", Validators.required],
    });
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
  submitAuthForm() {
    if (this.modalToggle === "Login") {
      console.log(this.loginForm.value);
      this.api.post("/shop/auth/login", this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          alert("Success!");
          this.temp = localStorage.setItem("customer-token", res.token);
          this.placeOrder();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log(this.customerRegisterForm.value);
      this.api
        .post("/shop/auth/register", this.customerRegisterForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            alert("Do Login!");
            this.router.navigate(["/cart"]);
          },
          error: (err) => {
            console.log(err);
            alert("Error");
          },
        });
    }
  }

  getAddresses() {
    this.api.get("/customers/address").subscribe({
      next: (res: any) => {
        this.orders.address = res[0];
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
    let temp = localStorage.getItem("customer-token");
    if (!this.orders.address) {
      alert("Add address first");
    }
    if (temp && this.orders.address) {
      // this.api.post("/shop/orders", this.orders).subscribe({
      //   next: (res: any) => {
      //     console.log(res);
      //     alert("Success!");
      //     this.router.navigateByUrl(`customer/orders/payment/${res.order._id}`);
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });
      this.router.navigateByUrl(`customer/orders/payment/${"fbsjfbsbfsfb"}`);
    } else {
    }
  }
  modalRegister() {
    this.modalToggle = "Register";
  }
  modalLogin() {
    this.modalToggle = "Login";
  }
}
