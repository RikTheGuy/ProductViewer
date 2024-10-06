import { combineReducers } from '@reduxjs/toolkit';
import { productReducer } from '../slices/products.slice';
import { ReducerLabels } from '../../constants/store.constant';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const rootReducer = combineReducers({
  [ReducerLabels.PRODUCT]: persistReducer(
    {
      key: ReducerLabels.PRODUCT,
      storage: AsyncStorage,
      whitelist: ['wishlist'],
    },
    productReducer,
  ),
});
