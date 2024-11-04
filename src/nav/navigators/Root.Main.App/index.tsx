import {createStackNavigator} from '@src/libs/stackNavigator';
import {TabNavigator} from '../Root.Main.App.Tabs';
import {ParkingLotDetail} from '@src/nav/screens/Root.Main.App/ParkingLot__Detail';
import {ParkingLotAdd} from '@src/nav/screens/Root.Main.App/ParkingLot__Add';
import {useMe} from './index.data';
import {ActivityIndicator} from 'react-native';
import {ProfileSetup} from '@src/nav/screens/Root.Main.App/Profile__Setup';
import {launchImageLibrary} from 'react-native-image-picker';
import {useEffect} from 'react';

export type RootStackParamList = {
    Tab: undefined;
    Profile__Setup: undefined;
    ParkingLot__Add: undefined;
    ParkingLot__Detail: {lotId: number};
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
    const {me, isFetching} = useMe();

    useEffect(() => {
        launchImageLibrary({mediaType: 'photo', selectionLimit: 1}).then(({assets}) => {
            console.log(assets);
        });
    }, []);

    const isUserProfileExists = !!me;

    if (isFetching) return <ActivityIndicator />;
    return (
        <Navigator initialRouteName="Tab">
            {!isUserProfileExists && <Screen name="Profile__Setup" component={ProfileSetup} />}
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
