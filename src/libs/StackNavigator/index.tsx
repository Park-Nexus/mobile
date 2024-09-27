import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

export function createStackNavigator() {
  const {Navigator: BaseNavigator, Screen} = createNativeStackNavigator();

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    statusBarTranslucent: true,
    statusBarColor: 'transparent',
    statusBarStyle: 'dark',
    navigationBarColor: 'transparent',
  };

  const Navigator = ({children}: {children: React.ReactNode}) => (
    <BaseNavigator screenOptions={screenOptions}>{children}</BaseNavigator>
  );

  return {Navigator, Screen};
}
