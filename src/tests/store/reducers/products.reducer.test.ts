import {
  ProductState,
  productReducer,
  productActions,
} from '../../../store/slices/products.slice';
import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { ProductsData } from '../../data/products.data';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('productReducer', () => {
  it('should return the initial state', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual({
      products: [],
      wishlist: [],
    });
  });

  describe('loadProducts', () => {
    it('should add products to products 1', () => {
      const previousState: ProductState = { products: [], wishlist: [] };

      const productsToAdd = ProductsData.sampleProducts.slice(0, 3);

      expect(
        productReducer(
          previousState,
          productActions.loadProducts({ products: productsToAdd }),
        ),
      ).toEqual({ products: productsToAdd, wishlist: [] });
    });

    it('should add products to products 2', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(0, 2),
        wishlist: [],
      };

      const productsToAdd = ProductsData.sampleProducts.slice(2, 4);

      expect(
        productReducer(
          previousState,
          productActions.loadProducts({ products: productsToAdd }),
        ),
      ).toEqual({
        products: ProductsData.sampleProducts.slice(0, 4),
        wishlist: [],
      });
    });

    it('should add products to products 3', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(0, 2),
        wishlist: ProductsData.sampleProducts.slice(1, 2),
      };

      const productsToAdd = ProductsData.sampleProducts.slice(2, 4);

      expect(
        productReducer(
          previousState,
          productActions.loadProducts({ products: productsToAdd }),
        ),
      ).toEqual({
        products: ProductsData.sampleProducts.slice(0, 4),
        wishlist: ProductsData.sampleProducts.slice(1, 2),
      });
    });

    it('should add products to products 3', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(0, 2),
        wishlist: ProductsData.sampleProducts.slice(0, 2),
      };

      const productsToAdd = ProductsData.sampleProducts.slice(2, 4);

      expect(
        productReducer(
          previousState,
          productActions.loadProducts({ products: productsToAdd }),
        ),
      ).toEqual({
        products: ProductsData.sampleProducts.slice(0, 4),
        wishlist: ProductsData.sampleProducts.slice(0, 2),
      });
    });
  });

  describe('clearProducts', () => {
    it('should clear everything from products', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(0, 2),
        wishlist: [],
      };

      expect(
        productReducer(previousState, productActions.clearProducts()),
      ).toEqual({
        products: [],
        wishlist: [],
      });
    });

    it('should clear everything from products 2', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(0, 4),
        wishlist: [],
      };

      expect(
        productReducer(previousState, productActions.clearProducts()),
      ).toEqual({
        products: [],
        wishlist: [],
      });
    });

    it('should clear everything from products 3', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(0, 4),
        wishlist: ProductsData.sampleProducts.slice(1, 3),
      };

      expect(
        productReducer(previousState, productActions.clearProducts()),
      ).toEqual({
        products: [],
        wishlist: ProductsData.sampleProducts.slice(1, 3),
      });
    });

    it('should clear everything from products 4', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(0, 4),
        wishlist: ProductsData.sampleProducts.slice(0, 4),
      };

      expect(
        productReducer(previousState, productActions.clearProducts()),
      ).toEqual({
        products: [],
        wishlist: ProductsData.sampleProducts.slice(0, 4),
      });
    });
  });

  describe('toggleAddToWishlist', () => {
    it('should add product to wishlist', () => {
      const previousState: ProductState = {
        products: [],
        wishlist: [],
      };

      expect(
        productReducer(
          previousState,
          productActions.toggleAddToWishlist({
            product: ProductsData.sampleProducts[1],
          }),
        ),
      ).toEqual({
        products: [],
        wishlist: [ProductsData.sampleProducts[1]],
      });
    });

    it('should add product to wishlist 2', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(0, 3),
        wishlist: [],
      };

      expect(
        productReducer(
          previousState,
          productActions.toggleAddToWishlist({
            product: ProductsData.sampleProducts[2],
          }),
        ),
      ).toEqual({
        products: ProductsData.sampleProducts.slice(0, 3),
        wishlist: [ProductsData.sampleProducts[2]],
      });
    });

    it('should remove product from wishlist', () => {
      const previousState: ProductState = {
        products: [],
        wishlist: ProductsData.sampleProducts.slice(0, 4),
      };

      expect(
        productReducer(
          previousState,
          productActions.toggleAddToWishlist({
            product: ProductsData.sampleProducts[0],
          }),
        ),
      ).toEqual({
        products: [],
        wishlist: ProductsData.sampleProducts.slice(1, 4),
      });
    });

    it('should remove product from wishlist 2', () => {
      const previousState: ProductState = {
        products: ProductsData.sampleProducts.slice(1, 4),
        wishlist: ProductsData.sampleProducts.slice(0, 3),
      };

      expect(
        productReducer(
          previousState,
          productActions.toggleAddToWishlist({
            product: ProductsData.sampleProducts[2],
          }),
        ),
      ).toEqual({
        products: ProductsData.sampleProducts.slice(1, 4),
        wishlist: ProductsData.sampleProducts.slice(0, 2),
      });
    });
  });
});
