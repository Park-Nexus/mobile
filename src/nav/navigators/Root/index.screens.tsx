import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SplashScreen} from '@src/nav/screens/Root';
import {Intro} from '@src/nav/screens/Root.Main.Auth/Intro';
import {Login} from '@src/nav/screens/Root.Main.Auth/Login';

const {Navigator, Screen} = createNativeStackNavigator();

export function RootScreens() {
  return (
    <Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        statusBarTranslucent: true,
        statusBarColor: 'transparent',
        statusBarStyle: 'dark',
        navigationBarColor: 'transparent',
      }}>
      <Screen name="intro" component={Intro} />
      <Screen name="splash" component={SplashScreen} />
      <Screen name="login" component={Login} />
    </Navigator>
  );
}
