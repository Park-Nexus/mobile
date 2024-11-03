import {createStackNavigator} from '@src/libs/stackNavigator';
import {TabNavigator} from '../Root.Main.App.Tabs';
import {ParkingLotDetail} from '@src/nav/screens/Root.Main.App/ParkingLot__Detail';
import {ParkingLotAdd} from '@src/nav/screens/Root.Main.App/ParkingLot__Add';
import {AccountSetup} from '@src/nav/screens/Root.Main.App/Account__Setup';

export type RootStackParamList = {
    Tab: undefined;
    Account__Setup: undefined;
    ParkingLot__Add: undefined;
    ParkingLot__Detail: {lotId: number};
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
    return (
        <Navigator initialRouteName="Tab">
            <Screen name="Tab" component={TabNavigator} />
            <Screen name="Account__Setup" component={AccountSetup} />
            <Screen name="ParkingLot__Add" component={ParkingLotAdd} />
            <Screen name="ParkingLot__Detail" component={ParkingLotDetail} />
        </Navigator>
    );
}
