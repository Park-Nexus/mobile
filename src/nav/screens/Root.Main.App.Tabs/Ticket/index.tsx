import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {ScrollView, Text, View} from 'react-native';
import {useMyTickets} from './index.data';

export function Ticket() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const {tickets} = useMyTickets();

    return (
        <SafeAreaView>
            <Header title="My Tickets" />
            <ScrollView>
                {tickets.map(ticket => (
                    <Text key={ticket.id}>{ticket.id}</Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
