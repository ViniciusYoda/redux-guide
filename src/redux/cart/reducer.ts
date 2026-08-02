import type { Product } from "../../data/products";
import CartActionTypes from "./action-types";
import type { CartAction } from "./actions";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartReducer = (state: CartState = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM: {
      const exists = state.items.some((item) => item.id === action.payload.id);
      return {
        ...state,
        items: exists
          ? state.items.map((item) => item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item)
          : [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case CartActionTypes.REMOVE_ITEM:
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case CartActionTypes.INCREASE_QUANTITY:
      return { ...state, items: state.items.map((item) => item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item) };
    case CartActionTypes.DECREASE_QUANTITY:
      return { ...state, items: state.items.map((item) => item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item).filter((item) => item.quantity > 0) };
    default:
      return state;
  }
};

export default cartReducer;
