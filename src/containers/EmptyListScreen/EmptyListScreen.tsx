import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../constants/colors.constant';
import { appText } from '../../constants/appText.constant';

type EmptyListScreenProps = {
  caption?: string;
};

const EmptyListScreen = (props: EmptyListScreenProps) => {
  const { caption } = props;

  return (
    <View style={Styles.container}>
      <Text style={Styles.caption}>{caption || appText.NO_ITEMS}</Text>
    </View>
  );
};

export default EmptyListScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  caption: {
    color: Colors.MUTED,
  },
});
