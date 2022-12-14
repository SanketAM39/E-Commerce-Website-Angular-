import { createReducer, on } from "@ngrx/store";
import {
  addToCart,
  clearCart,
  decreCount,
  increCount,
  removeFromCart,
  sumUpTotalAmount,
  addAllProducts,
} from "../actions/actions";
import { initialState, Product } from "../state/state";

// export interface products {
//   id: string;
//   name: string;
//   img: string;
//   description: string;
//   price: string;
// }

export const _customerReducer = createReducer(
  initialState,
  on(clearCart, (_) => {
    return {
      ..._,
      cart: [],
    };
  }),
  on(sumUpTotalAmount, (state) => {
    let tempAmount = 0;
    for (let i = 0; i < state.cart.length; i++) {
      tempAmount += state.cart[i].subTotal;
    }
    return {
      ...state,
      totalAmount: tempAmount,
    };
  }),
  on(addToCart, (state, action) => {
    const temp = structuredClone(state.cart);

    const found = temp.findIndex((i) => i._id === action.product._id);
    if (found >= 0) {
    } else {
      const objClone = structuredClone(action.product);
      objClone.qty = 1;
      objClone.productId = objClone._id;
      objClone.subTotal = objClone.price;
      temp.push(objClone);
    }

    return {
      ...state,
      cart: temp,
    };
  }),
  on(removeFromCart, (state, action) => {
    const entriesClone = structuredClone(state.cart);
    const found = entriesClone.find((i) => {
      return i._id === action.product._id;
    });
    if (found) {
      entriesClone.splice(entriesClone.indexOf(found), 1);
    }
    return {
      ...state,
      cart: entriesClone,
    };
  }),
  on(increCount, (state, action) => {
    const temp = structuredClone(state.cart);

    const found = temp.findIndex((i) => i._id == action.product._id);
    if (found > -1) {
      ++temp[found].qty;
      temp[found].subTotal = temp[found].qty * temp[found].price;
    }
    return {
      ...state,
      cart: temp,
    };
  }),
  on(decreCount, (state, action) => {
    const temp = structuredClone(state.cart);

    const found = temp.findIndex((i) => i._id == action.product._id);

    if (found > -1) {
      if (temp[found].qty <= 1) {
        temp.splice(found, 1);
      } else {
        --temp[found].qty;
        temp[found].subTotal = temp[found].qty * temp[found].price;
      }
    }
    return {
      ...state,
      cart: temp,
    };
  })
);

export function customerReducer(state: any, action: any) {
  return _customerReducer(state, action);
}
