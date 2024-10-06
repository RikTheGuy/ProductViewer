import React, { useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Product from '../../containers/Product/Product';
import { ProductType } from '../../types/product';
import { useAppSelector } from '../../hooks/store.hook';
import { selectWishlist } from '../../store/selectors/product.selector';
import EmptyListScreen from '../../containers/EmptyListScreen/EmptyListScreen';
import { appText } from '../../constants/appText.constant';

const WishlistScreen = (): React.JSX.Element => {
  const wishlistProducts = useAppSelector(selectWishlist);

  const renderProducts = useCallback((item: { item: ProductType }) => {
    return <Product product={item.item} />;
  }, []);

  return (
    <FlatList
      data={wishlistProducts || []}
      renderItem={renderProducts}
      ListEmptyComponent={<EmptyListScreen caption={appText.WISHLIST_EMPTY} />}
      maxToRenderPerBatch={5}
      keyExtractor={product => product.barcode}
      contentContainerStyle={Styles.container}
    />
  );
};

export default WishlistScreen;

const Styles = StyleSheet.create({
  container: { gap: 5, paddingVertical: 5, flexGrow: 1 },
});
