import {
  BottomTabNavigationOptions,
  createBottomTabNavigator as rnCreateBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

export function createBottomTabNavigator<T extends ParamListBase>() {
  const {Navigator: BaseNavigator, Screen} = rnCreateBottomTabNavigator<T>();

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,

    tabBarStyle: {
      marginHorizontal: 20,
      position: 'absolute',
      bottom: 28,
      borderRadius: 12,

      overflow: 'hidden',
      paddingBottom: 10,

      backgroundColor: 'rgba(255, 255, 255, 0.353)',
    },

    tabBarButton(props) {
      return <TouchableOpacity {...props} style={{flex: 1, padding: 8}} />;
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '700',
    },
    tabBarActiveTintColor: '#128085',
  };

  const Navigator = (props: {
    children: React.ReactNode;
    initialRouteName?: Extract<keyof T, string>;
  }) => {
    return <BaseNavigator screenOptions={screenOptions} {...props} />;
  };

  return {Navigator, Screen};
}
