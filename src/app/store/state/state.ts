export const initialState: customerState = {
  allProducts: [],
  cart: [],
  totalAmount: 0,
};

export interface customerState {
  allProducts: [];
  cart: Product[];
  totalAmount: number;
}

export interface Product {
  _id: string;
  productId: string;
  name: string;
  description: string;

  images: { public_id: string; url: string }[];
  price: number;
  qty: number;
  subTotal: number;
}
