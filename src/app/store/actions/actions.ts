import { createAction, props } from '@ngrx/store';
import { Product } from '../state/state';

export const addToCart = createAction(
  'addToCart',
  props<{ product: Product }>()
);
export const removeFromCart = createAction(
  'removeFromCart',
  props<{ product: Product }>()
);
export const increCount = createAction(
  'increCount',
  props<{ product: Product }>()
);
export const decreCount = createAction(
  'decreCount',
  props<{ product: Product }>()
);

export const sumUpTotalAmount = createAction('sumUpTotalAmount');

export const clearCart = createAction('clearCart');

export const addToBuyNow = createAction('addToBuyNow', props<any>());
export const removeFromBuyNow = createAction('removeFromBuyNow');
