import {createStackNavigator} from '@src/libs/stackNavigator';
import {TabNavigator} from '../Root.Main.App.Tabs';
import {ParkingLotDetail} from '@src/nav/screens/Root.Main.App/ParkingLot__Detail';

export type RootStackParamList = {
    Tab: undefined;
    ParkingLot__Detail: {lotId: number};
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
    return (
        <Navigator initialRouteName="Tab">
            <Screen name="Tab" component={TabNavigator} />
            <Screen name="ParkingLot__Detail" component={ParkingLotDetail} />
        </Navigator>
    );
}
