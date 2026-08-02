const CartActionTypes = {
  ADD_ITEM: "cart/addItem",
  REMOVE_ITEM: "cart/removeItem",
  INCREASE_QUANTITY: "cart/increaseQuantity",
  DECREASE_QUANTITY: "cart/decreaseQuantity",
} as const;

export default CartActionTypes;
