import { Dispatch } from "react";

export type ProductType = {
  id: number;
  name: string;
  price: number;
  PriceDemi: boolean;
  Unité: string;
  Active: boolean;
  image: string;
};

export type CartType = Required<ProductType> & {
  qty: number;
};

export type ClientType = {
  id: number;
  firstName: string;
  nolastNamem: string;
  phone: number;
  adress: string;
};

export type ProductActionType = { type: "ADD" } | { type: "HIDE" } | { type: "DELETE" };
export type CartActionType = { type: "ADD_PRODUCT" | "DELETE_PRODUCT" | "ADD_CLIENT" | "REMOVE_PRODUCT" | "CLEAR_CART"; payload: ProductType };

export type ProductStateType = {
  products: Array<ProductType>;
};

export type CartStateType = {
  cartProducts: Array<ProductType>;
};

export interface ProductContextPropsType {
  state: ProductStateType;
  dispatch: Dispatch<ProductActionType>;
}
export interface CartContextPropsType {
  state: CartStateType;
  dispatch: Dispatch<CartActionType>;
}
