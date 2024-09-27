import {createStackNavigator} from '@src/libs/StackNavigator';
import {Onboarding} from '@src/nav/screens/Root.Main.App/Onboarding';

const {Navigator, Screen} = createStackNavigator();

export function AppNavigator() {
  return (
    <Navigator>
      <Screen name="onboarding" component={Onboarding} />
    </Navigator>
  );
}
