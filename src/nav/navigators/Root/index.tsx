import {NavigationContainer} from '@react-navigation/native';
import {GlobalGuard} from '@src/components/GlobalGuard';
import {RootScreens} from './index.screens';
import {StatusBar} from 'react-native';

export function RootNavigator() {
  return (
    <NavigationContainer>
      <GlobalGuard>
        <RootScreens />
      </GlobalGuard>
    </NavigationContainer>
  );
}
