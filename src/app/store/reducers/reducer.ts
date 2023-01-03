import { createReducer, on } from '@ngrx/store';
import {
  increment,
  decrement,
  reset,
  clearCart,
  addProduct,
  removeProduct,
} from '../actions/actions';
import { Product } from '../state/state';
// import { initialState } from '../state/state';

export const initialState = 0;
export const intialCartEntries: Product[] = [];

export const addCartReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

export const cartReducer = createReducer(
  intialCartEntries,
  on(clearCart, (_) => []),

  on(addProduct, (entries, product) => {
    const entriesClone: Product[] = JSON.parse(JSON.stringify(entries));
    entriesClone.push(product);
    return entriesClone;
  }),
  on(removeProduct, (entries, product) => {
    const entriesClone: Product[] = JSON.parse(JSON.stringify(entries));
    const found = entriesClone.find((e) => e.id == product.id);
    if (found) {
      entriesClone.splice(entriesClone.indexOf(found), 1);
    }
    return entriesClone;
  })
);
