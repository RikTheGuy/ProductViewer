import { combineReducers } from '@reduxjs/toolkit';
import { productReducer } from '../slices/products.slice';
import { ReducerLabels } from '../../constants/store.constant';

export const rootReducer = combineReducers({
  [ReducerLabels.PRODUCT]: productReducer,
});
