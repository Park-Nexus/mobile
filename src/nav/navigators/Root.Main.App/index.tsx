import {createStackNavigator} from '@src/libs/stackNavigator';
import {TabNavigator} from '../Root.Main.App.Tabs';
import {ParkingLotDetail} from '@src/nav/screens/Root.Main.App/ParkingLot__Detail';
import {ParkingLotAdd} from '@src/nav/screens/Root.Main.App/ParkingLot__Add';
import {AccountSetup} from '@src/nav/screens/Root.Main.App/Account__Setup';
import {useMe} from './index.data';
import {ActivityIndicator} from 'react-native';

export type RootStackParamList = {
    Tab: undefined;
    Account__Setup: undefined;
    ParkingLot__Add: undefined;
    ParkingLot__Detail: {lotId: number};
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
    const {me, isFetching} = useMe();

    const isUserProfileExists = !!me;

    if (isFetching) return <ActivityIndicator />;
    return (
        <Navigator initialRouteName="Tab">
            {!isUserProfileExists && <Screen name="Account__Setup" component={AccountSetup} />}
            {isUserProfileExists && (
                <>
                    <Screen name="Tab" component={TabNavigator} />
                    <Screen name="ParkingLot__Add" component={ParkingLotAdd} />
                    <Screen name="ParkingLot__Detail" component={ParkingLotDetail} />
                </>
            )}
        </Navigator>
    );
}
