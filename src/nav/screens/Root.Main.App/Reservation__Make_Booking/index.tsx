import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {MakeBookingContext} from './index.context';

type ScreenProps = {
    route: RouteProp<AppStackParamList, 'Reservation__Make_Booking'>;
};

export function Reservation__Make_Booking({route}: ScreenProps) {
    return <MakeBookingContext lotId={route.params.lotId}></MakeBookingContext>;
}
