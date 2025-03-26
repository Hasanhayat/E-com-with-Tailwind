import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const calculateTotals = (items) => {
  return items.reduce(
    (sums, item) => {
      sums.totalAmount += item.price * item.quantity;
      sums.totalQuantity += item.quantity;
      return sums;
    },
    { totalAmount: 0, totalQuantity: 0 }
  );
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        state.items.push({ ...action.payload });
      }

      // Calculate totals
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);

      // Calculate totals
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = quantity;
      }

      // Calculate totals
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer; 