import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { addToCart } from 'src/app/store/actions/actions';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cartProducts: any;
  totalPrice: number = 0;
  cart = false;
  products: any = [];
  itemsPerPage: number = 20;
  page: any = 1;
  totalPages!: number;
  changePasswordForm!: FormGroup;

  temp: any = JSON.parse(localStorage.getItem('cart-status')!) || [];

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
    });
  }

  token = localStorage.getItem('customer-token');
  query = `?page=${this.page}&limit=${this.itemsPerPage}`;

  ngOnInit(): void {
    this.getProducts();
    if (this.cartProducts.length === 0) {
      localStorage.removeItem('cart-status');
      this.temp = [];
    }
    console.log(this.cartProducts);
    console.log(this.temp); //IMP
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
        for (let i = 0; i < res.results.length; i++) {
          let obj = {
            _id: 0,
            status: false,
          };
          obj._id = res.results[i]._id;
          obj.status = false;
          this.temp.push(obj);
        }
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
        window.location.reload();
      }
    });
  }

  changePassword() {
    this.api
      .post('/customers/auth/change-password', this.changePasswordForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.changePasswordForm.reset();
          alert('Success!');
        },
        error: (err) => {
          console.log(err);
          alert('Error!');
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

  addToCart(Product: any, id: string) {
    this.store.dispatch(addToCart({ product: Product }));
    console.log(Product);
    for (let i = 0; i < this.temp.length; i++) {
      if (this.temp[i]._id == Product._id) {
        this.temp[i].status = true;
      }
    }
    localStorage.setItem('cart-status', JSON.stringify(this.temp));
  }
}
