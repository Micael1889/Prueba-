import { createContext } from "react";

export const CartContext = createContext({
  cart: [],
  clearCart: () => {},
  AddCart: () => {},
  RemoveItemCart: () => {},
});
