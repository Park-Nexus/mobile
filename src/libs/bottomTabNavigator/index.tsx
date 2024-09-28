import {createBottomTabNavigator as rnCreateBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';

export function createBottomTabNavigator<T extends ParamListBase>() {
  const {Navigator: BaseNavigator, Screen} = rnCreateBottomTabNavigator<T>();

  const Navigator = (props: {
    children: React.ReactNode;
    initialRouteName?: Extract<keyof T, string>;
  }) => {
    return <BaseNavigator {...props} />;
  };

  return {Navigator, Screen};
}
