import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((it) => it._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((it) =>
          it._id === existItem._id ? item : it
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate the items price in whole number (pennies) to avoid issues with
      // floating point number calculations
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price * 100 * item.qty) / 100,
        0
      );
      state.itemsPrice = addDecimals(itemsPrice);

      // Calculate the shipping price
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      state.shippingPrice = addDecimals(shippingPrice);

      // Calculate the tax price
      const taxPrice = 0.15 * itemsPrice;
      state.taxPrice = addDecimals(taxPrice);

      const totalPrice = itemsPrice + shippingPrice + taxPrice;
      // Calculate the total price
      state.totalPrice = addDecimals(totalPrice);

      // Save the cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
