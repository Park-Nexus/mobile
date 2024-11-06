import {createStackNavigator} from '@src/libs/stackNavigator';
import {TabNavigator} from '../Root.Main.App.Tabs';
import {ParkingLot__Detail} from '@src/nav/screens/Root.Main.App/ParkingLot__Detail';
import {ParkingLot__Add} from '@src/nav/screens/Root.Main.App/ParkingLot__Add';
import {useMe} from './index.data';
import {ActivityIndicator} from 'react-native';
import {Profile__Setup} from '@src/nav/screens/Root.Main.App/Profile__Setup';
import {ParkingLot__MyLotDetail} from '@src/nav/screens/Root.Main.App/ParkingLot__MyLotDetail';
import {ParkingLot__Update} from '@src/nav/screens/Root.Main.App/ParkingLot__Update';

export type AppStackParamList = {
    Tab: undefined;

    Profile__Setup: undefined;

    ParkingLot__Add: undefined;
    ParkingLot__Update: {lotId: number};
    ParkingLot__MyLotDetail: {lotId: number};
    ParkingLot__Detail: {lotId: number};
};

const {Navigator, Screen} = createStackNavigator<AppStackParamList>();

export function AppNavigator() {
    const {me, isFetching} = useMe();

    const isUserProfileExists = !!me;

    if (isFetching) return <ActivityIndicator />;
    return (
        <Navigator initialRouteName="Tab">
            {!isUserProfileExists && <Screen name="Profile__Setup" component={Profile__Setup} />}
            {isUserProfileExists && (
                <>
                    <Screen name="Tab" component={TabNavigator} />
                    <Screen name="ParkingLot__Add" component={ParkingLot__Add} />
                    <Screen name="ParkingLot__Update" component={ParkingLot__Update} />
                    <Screen name="ParkingLot__MyLotDetail" component={ParkingLot__MyLotDetail} />
                    <Screen name="ParkingLot__Detail" component={ParkingLot__Detail} />
                </>
            )}
        </Navigator>
    );
}
