import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
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
import { appText } from '../../constants/appText.constant';
import { AxiosError } from 'axios';
import PVText from '../../components/Text/PVText';
import debounce from 'lodash/debounce';
import { DEBOUNCE_RATE } from '../../constants/common.constant';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
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
      setError('');
      dispatch(productActions.clearProducts());
    };
  }, [dispatch]);

  const fetchPage = useCallback(
    debounce(async (pageNumber: number = 1, shouldRefresh = false) => {
      setLoading(true);
      if (shouldRefresh) {
        setRefreshing(true);
        dispatch(productActions.clearProducts());
      }
      try {
        const result = await productServices.fetchProducts(pageNumber);
        console.log('Came');
        setError('');
        dispatch(productActions.loadProducts({ products: result.results }));
        setPage(pageNumber);
        setHasNext(result.next);
      } catch (error: unknown) {
        setError(appText.ERROR_GENERIC);
        if (error instanceof AxiosError && error.code === 'ERR_NETWORK') {
          setError(appText.ERROR_OFFLINE);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }, DEBOUNCE_RATE),
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
        <View>
          {isLoading ? (
            <ActivityIndicator color={Colors.PRIMARY} />
          ) : error ? (
            <PVText style={Styles.error}>{error}</PVText>
          ) : (
            <></>
          )}
        </View>
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
  error: {
    color: Colors.DANGER,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
  },
});
