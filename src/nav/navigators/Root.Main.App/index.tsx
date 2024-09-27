import {createStackNavigator} from '@src/libs/stackNavigator';
import {Onboarding} from '@src/nav/screens/Root.Main.App/Onboarding';

const {Navigator, Screen} = createStackNavigator();

export function AppNavigator() {
  return (
    <Navigator>
      <Screen name="Onboarding" component={Onboarding} />
    </Navigator>
  );
}
