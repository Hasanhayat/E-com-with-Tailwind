import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  selectedProduct: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    sortBy: 'latest',
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setProducts,
  setCategories,
  setLoading,
  setError,
  setSelectedProduct,
  updateFilters,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;