import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '@src/nav/screens/Root.Main.Auth/Login';

const {Navigator, Screen} = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Navigator>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
