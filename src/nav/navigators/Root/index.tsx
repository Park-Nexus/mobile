import {NavigationContainer} from '@react-navigation/native';
import {GlobalGuard} from '@src/components/GlobalGuard';
import {SplashScreen} from '@src/nav/screens/Root';

export function RootNavigator() {
  return (
    <NavigationContainer>
      <GlobalGuard>
        <SplashScreen />
      </GlobalGuard>
    </NavigationContainer>
  );
}
