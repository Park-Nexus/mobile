import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';

type ScreenParams = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList, 'Reservation__CICO'>;
};
export function Reservation__CICO({navigation, route}: ScreenParams) {
    return (
        <SafeAreaView>
            <Header title="Check In/Check Out" />
        </SafeAreaView>
    );
}
