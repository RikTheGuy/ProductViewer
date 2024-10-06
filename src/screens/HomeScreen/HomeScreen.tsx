import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { productServices } from '../../services/products.service';
import { ProductType } from '../../types/product';
import { Colors } from '../../constants/colors.constant';

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  // Initial Load
  useEffect(() => {
    fetchPage();
    return () => {
      setProducts([]);
    };
  }, []);

  const fetchPage = useCallback(async () => {
    setLoading(true);
    const result = await productServices.fetchProducts();
    setProducts(result.results);
    setLoading(false);
  }, []);

  return (
    <FlatList
      data={products || []}
      renderItem={({ item }: { item: ProductType }) => (
        <View>
          <Text>{item.name}</Text>
        </View>
      )}
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
