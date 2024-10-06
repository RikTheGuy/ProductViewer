import { createDraftSafeSelector } from '@reduxjs/toolkit/react';
import { ReducerLabels } from '../../constants/store.constant';
import { RootState } from '../../types/store';
import { ProductType } from '../../types/product';

const _selectProducts = (state: RootState) =>
  state[ReducerLabels.PRODUCT].products;
const _selectWishlist = (state: RootState) =>
  state[ReducerLabels.PRODUCT].wishlist;

export const selectProducts = _selectProducts;
export const selectWishlist = _selectWishlist;
export const selectIsInWishlist = createDraftSafeSelector(
  [_selectWishlist, (state, product: ProductType) => product],
  (products, product) => products.includes(product),
);
