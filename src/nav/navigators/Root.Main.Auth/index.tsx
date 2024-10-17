import {createStackNavigator} from '@src/libs/stackNavigator';

import {Intro} from '@src/nav/screens/Root.Main.Auth/Intro';
import {Login} from '@src/nav/screens/Root.Main.Auth/Login';

const {Navigator, Screen} = createStackNavigator();

export function AuthNavigator() {
    return (
        <Navigator initialRouteName="Intro">
            <Screen name="Login" component={Login} />
            <Screen name="Intro" component={Intro} />
        </Navigator>
    );
}
