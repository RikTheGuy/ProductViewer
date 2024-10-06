import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from '../constants/routes.constant';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import WishlistScreen from '../screens/WishlistScreen/WishlistScreen';
import { NavigatorConfigs } from '../configs/navigator.config';

const TabNavigator = createBottomTabNavigator();

const RootNavigator = (): React.JSX.Element => {
  return (
    <TabNavigator.Navigator
      initialRouteName={Routes.HOME}
      screenOptions={NavigatorConfigs.RootNavigatorOptions}>
      <TabNavigator.Screen name={Routes.HOME} component={HomeScreen} />
      <TabNavigator.Screen name={Routes.WISHLIST} component={WishlistScreen} />
    </TabNavigator.Navigator>
  );
};

export default RootNavigator;
