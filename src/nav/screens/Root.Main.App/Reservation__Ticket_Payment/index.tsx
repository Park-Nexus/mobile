import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, 'Reservation__Ticket_Payment'>;
    route: RouteProp<AppStackParamList, 'Reservation__Ticket_Payment'>;
};
export function Reservation__Ticket_Payment({}: ScreenProps) {
    return <></>;
}
