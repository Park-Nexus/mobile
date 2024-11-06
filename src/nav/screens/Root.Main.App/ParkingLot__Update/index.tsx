import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {useMyParkingLot} from './index.data';

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, 'ParkingLot__Update'>;
    route: RouteProp<AppStackParamList, 'ParkingLot__Update'>;
};
export function ParkingLot__Update({navigation, route}: ScreenProps) {
    const {lotId} = route.params;
    const {data} = useMyParkingLot(lotId);

    return (
        <SafeAreaView>
            <Header title="Update parking lot" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
}
