import { createAction, props } from '@ngrx/store';
import { Product } from '../state/state';

export const increment = createAction('[Counter Component] Increment');
export const decrement = createAction('[Counter Component] Decrement');
export const reset = createAction('[Counter Component] Reset');

export const addProduct = createAction('Add Product', props<Product>());
export const removeProduct = createAction('Remove Product', props<Product>());
export const clearCart = createAction('Clear Cart');
