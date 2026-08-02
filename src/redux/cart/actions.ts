import type { Product } from "../../data/products";
import CartActionTypes from "./action-types";

export const addItem = (product: Product) => ({ type: CartActionTypes.ADD_ITEM, payload: product } as const);
export const removeItem = (productId: string) => ({ type: CartActionTypes.REMOVE_ITEM, payload: productId } as const);
export const increaseQuantity = (productId: string) => ({ type: CartActionTypes.INCREASE_QUANTITY, payload: productId } as const);
export const decreaseQuantity = (productId: string) => ({ type: CartActionTypes.DECREASE_QUANTITY, payload: productId } as const);

export type CartAction =
  | ReturnType<typeof addItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof increaseQuantity>
  | ReturnType<typeof decreaseQuantity>;
