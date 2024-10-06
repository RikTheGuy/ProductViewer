import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Colors } from '../constants/colors.constant';

const RootNavigatorOptions: BottomTabNavigationOptions = {
  headerShown: true,
  tabBarIcon: () => undefined,
  tabBarLabelPosition: 'beside-icon',
  headerTintColor: Colors.PRIMARY,
  tabBarActiveTintColor: Colors.PRIMARY,
  freezeOnBlur: true,
};

export const NavigatorConfigs = {
  RootNavigatorOptions,
};
