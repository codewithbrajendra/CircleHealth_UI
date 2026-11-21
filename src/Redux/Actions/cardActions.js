import { ADD_TO_CART, REMOVE_TO_CART, CLEAR_CART } from "../constants";

//cart actions
export const addToCart = (data) => {
  // console.warn("action", data);
  return { type: ADD_TO_CART, data: data };
};
export const removeToCart = (data) => {
  console.warn("action", data);
  return { type: REMOVE_TO_CART, data: data };
};
export const clearCart = () => {
  console.warn("CLEAR_CART");
  return { type: CLEAR_CART };
};
