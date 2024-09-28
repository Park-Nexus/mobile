import {createStackNavigator} from '@src/libs/stackNavigator';
import {Test} from '@src/nav/screens/Root.Main.App/Test';

const {Navigator, Screen} = createStackNavigator();

export function AppNavigator() {
  return (
    <Navigator>
      <Screen name="Test" component={Test} />
    </Navigator>
  );
}
