import React, { memo } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { ProductType } from '../../types/product';
import { Colors } from '../../constants/colors.constant';
import { Entities } from '../../constants/entities.constant';
import PVText from '../../components/Text/PVText';
import { SPACE, ROUNDED } from '../../constants/sizes.constant';
import { appText } from '../../constants/appText.constant';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { selectIsInWishlist } from '../../store/selectors/product.selector';
import { productActions } from '../../store/slices/products.slice';

export type ProductPropType = {
  product: ProductType;
};

const Product = (props: ProductPropType): React.JSX.Element => {
  const { product } = props;

  const dispatch = useAppDispatch();
  const existsInWishlist = useAppSelector(state =>
    selectIsInWishlist(state, product),
  );

  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        <Image
          style={Styles.image}
          defaultSource={require('../../assets/images/thumbnail.jpg')}
          src={product.image}
        />
        <View style={Styles.priceContainer}>
          <PVText style={Styles.mrp}>{Entities.RUPEE + product.mrp}</PVText>
          <PVText style={Styles.sp}>{Entities.RUPEE + product.sp}</PVText>
        </View>
      </View>
      <View style={Styles.details}>
        <View>
          <PVText style={Styles.name}>{product.name}</PVText>
          <PVText style={Styles.brand}>{product.brand}</PVText>
          <View style={Styles.description}>
            <PVText style={Styles.descriptionText}>{product.division}</PVText>
            <PVText style={Styles.descriptionText}>{product.category}</PVText>
            <PVText style={Styles.descriptionText}>
              {product.sub_category}
            </PVText>
          </View>
        </View>
        <View style={Styles.buttonContainer}>
          <TouchableOpacity onPress={toggleWishlist}>
            <View>
              <PVText
                style={{
                  ...Styles.wishlistButton,
                  color: existsInWishlist ? Colors.DANGER : Colors.PRIMARY,
                }}>
                {existsInWishlist
                  ? appText.REMOVE_FROM_WISHLIST
                  : appText.ADD_TO_WISHLIST}
              </PVText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  function toggleWishlist() {
    dispatch(productActions.toggleAddToWishlist({ product }));
  }
};

export default memo(
  Product,
  (prevProps, nextProps) =>
    prevProps.product.barcode === nextProps.product.barcode,
);

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.BACKGROUND,
    borderRadius: ROUNDED.MEDIUM,
    padding: SPACE.MEDIUM,
    paddingTop: SPACE.LARGE,
    paddingBottom: 0,
    marginHorizontal: SPACE.SMALL,
    gap: SPACE.MEDIUM,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACE.SMALL,
  },
  mrp: {
    flex: 1,
    textDecorationLine: 'line-through',
    fontStyle: 'italic',
    color: Colors.DANGER,
  },
  sp: {
    flex: 1,
    textAlign: 'right',
    color: Colors.TEXT,
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    fontWeight: '600',
    color: Colors.TEXT,
  },
  brand: {
    flex: 1,
    color: Colors.TEXT,
    textTransform: 'capitalize',
    fontStyle: 'italic',
  },
  description: {
    padding: SPACE.SMALL,
  },
  descriptionText: {
    color: Colors.MUTED,
    textTransform: 'capitalize',
  },
  buttonContainer: {
    borderTopWidth: 1,
    borderColor: Colors.MUTED,
  },
  wishlistButton: {
    textAlign: 'center',
    padding: SPACE.SMALL,
    color: Colors.TEXT,
  },
});
