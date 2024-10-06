import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReducerLabels } from '../../constants/store.constant';
import { ProductType } from '../../types/product';

export type ProductState = {
  products: ProductType[];
  wishlist: ProductType[];
};

const initialState: ProductState = {
  products: [],
  wishlist: [],
};

export const productSlice = createSlice({
  name: ReducerLabels.PRODUCT,
  initialState,
  reducers: {
    loadProducts: (
      state,
      action: PayloadAction<{ products: ProductType[] }>,
    ) => {
      state.products = state.products.concat(action.payload.products);
    },
    clearProducts: state => {
      state.products = initialState.products;
    },
    toggleAddToWishlist: (
      state,
      action: PayloadAction<{ product: ProductType }>,
    ) => {
      const productIndex = state.wishlist.findIndex(
        product => product.barcode === action.payload.product.barcode,
      );
      if (productIndex > -1) {
        state.wishlist.splice(productIndex, 1);
      } else {
        state.wishlist.push(action.payload.product);
      }
    },
  },
});

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
