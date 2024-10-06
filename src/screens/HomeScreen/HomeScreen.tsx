import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { productServices } from '../../services/products.service';
import { ProductType } from '../../types/product';
import { Colors } from '../../constants/colors.constant';
import Product from '../../containers/Product/Product';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { productActions } from '../../store/slices/products.slice';
import { selectProducts } from '../../store/selectors/product.selector';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const [isLoading, setLoading] = useState(false);

  // Initial Load
  useEffect(() => {
    fetchPage();
    return () => {
      dispatch(productActions.clearProducts());
    };
  }, [dispatch]);

  const fetchPage = useCallback(async () => {
    setLoading(true);
    const result = await productServices.fetchProducts();
    dispatch(productActions.loadProducts({ products: result.results }));
    setLoading(false);
  }, []);

  const renderProducts = useCallback((item: { item: ProductType }) => {
    return <Product product={item.item} />;
  }, []);

  return (
    <FlatList
      data={products || []}
      renderItem={renderProducts}
      keyExtractor={product => product.barcode}
      contentContainerStyle={Styles.container}
      ListFooterComponent={
        isLoading ? <ActivityIndicator color={Colors.PRIMARY} /> : <></>
      }
    />
  );
};

export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    gap: 5,
  },
});
