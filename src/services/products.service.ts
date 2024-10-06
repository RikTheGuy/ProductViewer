import axios from 'axios';
import { urlConstants } from '../constants/url.constant';
import { ProductType } from '../types/product';

const fetchProducts = async (
  page: number = 1,
): Promise<{
  results: ProductType[];
  next: boolean;
}> => {
  const { data } = await axios.get(
    urlConstants.BASE_URL + urlConstants.PRODUCTS_URL(page),
  );

  return data;
};

export const productServices = {
  fetchProducts,
};
