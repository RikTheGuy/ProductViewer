import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { productServices } from '../../services/products.service';
import { ProductType } from '../../types/product';
import { Colors } from '../../constants/colors.constant';
import Product from '../../containers/Product/Product';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { productActions } from '../../store/slices/products.slice';
import { selectProducts } from '../../store/selectors/product.selector';
import EmptyListScreen from '../../containers/EmptyListScreen/EmptyListScreen';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  // Initial Load
  useEffect(() => {
    fetchPage();
    return () => {
      //Reset Loader
      setLoading(false);
      setRefreshing(false);
      dispatch(productActions.clearProducts());
    };
  }, [dispatch]);

  const fetchPage = useCallback(
    async (pageNumber: number = 1, shouldRefresh = false) => {
      setLoading(true);
      if (shouldRefresh) setRefreshing(true);
      const result = await productServices.fetchProducts(pageNumber);
      if (shouldRefresh) dispatch(productActions.clearProducts());
      dispatch(productActions.loadProducts({ products: result.results }));
      setPage(pageNumber);
      setHasNext(result.next);
      setLoading(false);
      setRefreshing(false);
    },
    [dispatch],
  );

  const renderProducts = useCallback((item: { item: ProductType }) => {
    return <Product product={item.item} />;
  }, []);

  return (
    <FlatList
      data={products || []}
      renderItem={renderProducts}
      maxToRenderPerBatch={5}
      keyExtractor={product => product.barcode}
      contentContainerStyle={Styles.container}
      onEndReached={loadMorePages}
      onEndReachedThreshold={1}
      ListEmptyComponent={!isLoading ? <EmptyListScreen /> : <></>}
      ListFooterComponent={
        isLoading ? <ActivityIndicator color={Colors.PRIMARY} /> : <></>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={[Colors.PRIMARY]}
        />
      }
    />
  );

  function onRefresh() {
    if (isLoading || isRefreshing) return;
    fetchPage(1, true);
  }

  function loadMorePages() {
    if (isLoading || isRefreshing) return;
    if (!hasNext) return;
    fetchPage(page + 1);
  }
};

export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    gap: 5,
    flexGrow: 1,
  },
});
