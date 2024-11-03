import {createStackNavigator} from '@src/libs/stackNavigator';

import {Intro} from '@src/nav/screens/Root.Main.Auth/Intro';
import {Login} from '@src/nav/screens/Root.Main.Auth/Login';
import {Register} from '@src/nav/screens/Root.Main.Auth/Register';

export type AuthStackParamList = {
    Intro: undefined;
    Login: undefined;
    Register: undefined;
};

const {Navigator, Screen} = createStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
    return (
        <Navigator initialRouteName="Intro">
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
            <Screen name="Intro" component={Intro} />
        </Navigator>
    );
}
