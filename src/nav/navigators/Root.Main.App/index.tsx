import {createStackNavigator} from '@src/libs/stackNavigator';
import {Test} from '@src/nav/screens/Root.Main.App/Test';
import {TabNavigator} from '../Root.Main.App.Tabs';

const {Navigator, Screen} = createStackNavigator();

export function AppNavigator() {
    return (
        <Navigator initialRouteName="Tab">
            <Screen name="Test" component={Test} />
            <Screen name="Tab" component={TabNavigator} />
        </Navigator>
    );
}
