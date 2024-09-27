import {createStackNavigator} from '@src/libs/stackNavigator';
import {Login} from '@src/nav/screens/Root.Main.Auth/Login';

const {Navigator, Screen} = createStackNavigator();

export function AuthNavigator() {
  return (
    <Navigator>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
