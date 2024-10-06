import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors.constant';

type PVTextProps = PropsWithChildren & {
  style?: TextStyle;
};

const PVText = (props: PVTextProps) => {
  const { children, style } = props;

  return <Text style={{ ...Styles.text, ...style }}>{children}</Text>;
};

export default PVText;

const Styles = StyleSheet.create({
  text: {
    color: Colors.TEXT,
  },
});
