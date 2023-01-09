import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { addToCart } from 'src/app/store/actions/actions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cartProducts: any;
  totalPrice: number = 0;
  // productAdded: boolean = false;

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<{
      cart: { cart: any; totalAmount: any; productAdded: boolean };
    }>
  ) {
    this.store.select('cart').subscribe((data) => {
      this.cartProducts = data.cart;
      this.totalPrice = data.totalAmount;
      // this.productAdded = data.cart.productAdded;
    });
  }

  products: any = [];
  itemsPerPage: number = 20;
  page: any = 1;
  totalPages!: number;
  changePasswordForm!: FormGroup;
  cartItemCount$!: Observable<number>;

  token = localStorage.getItem('customer-token');
  query = `?page=${this.page}&limit=${this.itemsPerPage}`;

  ngOnInit(): void {
    // this.store.select("cartItemCount").subscribe((data) => {
    //   this.cartItemCount = data.counter;
    // });
    this.getProducts();
    this.changePasswordForm = this.fb.group({
      old_password: [''],
      new_password: [''],
    });
  }

  getProducts() {
    this.query = `?page=${this.page}&limit=${this.itemsPerPage}`;
    this.api.get(`/shop/products${this.query}`).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res.results;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  logOut() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Don't be Window Shopper!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log Out!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('customer-token');
      }
    });
  }

  changePassword() {
    console.log(this.changePasswordForm.value);
    this.api
      .post('/customers/auth/change-password', this.changePasswordForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.changePasswordForm.reset();
          alert('Success!');
          //  this.toastr.success("Hello world!", "Toastr fun!");
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  previous() {
    if (this.page > 1) {
      this.page -= 1;
    }
    this.getProducts();
  }
  next() {
    if (this.page < this.totalPages) {
      this.page += 1;
    }
    this.getProducts();
  }
  changeLimit(event: any) {
    this.itemsPerPage = event.target.value;
    this.getProducts();
  }

  addToCart(product: any) {
    this.store.dispatch(addToCart({ product: product }));
  }
}
