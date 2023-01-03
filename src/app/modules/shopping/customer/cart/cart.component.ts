import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
  addProduct,
  decrement,
  increment,
  removeProduct,
  reset,
} from 'src/app/store/actions/actions';
import {
  ProductGroup,
  selectGroupedCartEntries,
} from 'src/app/store/selector/selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartProducts!: any;
  cartItemCount$!: Observable<number>;
  // cartEntries$: Observable<ProductGroup[]>;
  constructor(
    private api: ApiService,
    private store: Store<{ cartItemCount: number }>
  ) {
    // this.cartEntries$ = store.select(selectGroupedCartEntries);
  }
  ngOnInit() {
    this.cartItemCount$ = this.store.select('cartItemCount');
    this.getProducts();
  }
  getProducts() {
    this.api.get('/products/62e2174bb26e310e8d3d947a').subscribe({
      next: (res) => {
        console.log(res);
        this.cartProducts = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onIncrement() {
    this.store.dispatch(increment());
  }
  onDecrement() {
    this.store.dispatch(decrement());
  }
  onReset() {
    this.store.dispatch(reset());
  }
}
