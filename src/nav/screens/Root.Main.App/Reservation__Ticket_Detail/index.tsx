import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {useTicketDetail} from './index.data';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {Header} from '@src/components/Header';
import QRCode from 'react-native-qrcode-svg';
import {TabParamList} from '@src/nav/navigators/Root.Main.App.Tabs';
import {ScrollView} from 'react-native-gesture-handler';
import {Linking, Platform, Text, View} from 'react-native';
import dayjs from 'dayjs';
import {Button} from '@src/components/Button';

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, 'Reservation__Ticket_Detail'>;
    route: RouteProp<AppStackParamList, 'Reservation__Ticket_Detail'>;
};
export function Reservation__Ticket_Detail({route}: ScreenProps) {
    const tabNavigation = useNavigation<NavigationProp<TabParamList>>();
    const {ticket} = useTicketDetail(route.params.ticketId);

    console.log(ticket);

    const directionLink = Platform.select({
        ios: `maps://${ticket?.parkingSpot?.parkingLot?.latitude},${ticket?.parkingSpot?.parkingLot?.longitude}?q='${ticket?.parkingSpot?.parkingLot?.name}'`,
        android: `geo://${ticket?.parkingSpot?.parkingLot?.latitude},${ticket?.parkingSpot?.parkingLot?.longitude}?q='${ticket?.parkingSpot?.parkingLot?.name}'`,
    });

    return (
        <SafeAreaView>
            <Header title="Ticket" backButtonVisible onBackButtonPress={() => tabNavigation.navigate('Ticket')} />
            <ScrollView style={{padding: 16}}>
                <View style={{backgroundColor: '#128085', borderRadius: 12}}>
                    <View style={{padding: 16}}>
                        <Text style={{color: '#FAFAFA', fontSize: 14, fontWeight: '400', textAlign: 'center'}}>
                            Scan me when you arrive{'\n'}at the parking lot
                        </Text>
                        <View style={{height: 8}} />
                        <View style={{alignItems: 'center'}}>
                            <QRCode color="#FAFAFA" backgroundColor="#128085" size={180} value={ticket?.code} />
                        </View>
                    </View>
                    <View
                        style={{
                            height: 24,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                backgroundColor: '#FAFAFA',
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                borderColor: '#FAFAFA',
                                borderWidth: 1,
                                borderStyle: 'dashed',
                            }}
                        />
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                backgroundColor: '#FAFAFA',
                                borderTopLeftRadius: 12,
                                borderBottomLeftRadius: 12,
                            }}
                        />
                    </View>

                    <View style={{padding: 16, flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: '#CCCBCB', fontSize: 12, fontWeight: '600'}}>Parking Lot</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: '#FAFAFA', fontSize: 14, fontWeight: '600'}}>
                                {ticket?.parkingSpot?.parkingLot?.name}
                            </Text>

                            <View style={{height: 8}} />

                            <Text style={{color: '#CCCBCB', fontSize: 12, fontWeight: '600'}}>Vehicle</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: '#FAFAFA', fontSize: 14, fontWeight: '600'}}>
                                {ticket?.vehicle?.brand} {ticket?.vehicle?.model}
                            </Text>

                            <View style={{height: 8}} />

                            <Text style={{color: '#CCCBCB', fontSize: 12, fontWeight: '600'}}>Start Time</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: '#FAFAFA', fontSize: 14, fontWeight: '600'}}>
                                {dayjs(ticket?.startTime).format('DD-MM-YYYY HH:mm')}
                            </Text>
                        </View>
                        <View style={{width: 8}} />
                        <View style={{flex: 1}}>
                            <Text style={{color: '#CCCBCB', fontSize: 12, fontWeight: '600'}}>Phone</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: '#FAFAFA', fontSize: 14, fontWeight: '600'}}>
                                {ticket?.parkingSpot?.parkingLot?.phone}
                            </Text>

                            <View style={{height: 8}} />

                            <Text style={{color: '#CCCBCB', fontSize: 12, fontWeight: '600'}}>Parking Spot</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: '#FAFAFA', fontSize: 14, fontWeight: '600'}}>
                                {ticket?.parkingSpot?.name}
                            </Text>

                            <View style={{height: 8}} />

                            <Text style={{color: '#CCCBCB', fontSize: 12, fontWeight: '600'}}>End Time</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: '#FAFAFA', fontSize: 14, fontWeight: '600'}}>
                                {dayjs(ticket?.endTime).format('DD-MM-YYYY HH:mm')}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 14}} />
                <View style={{flexDirection: 'row'}}>
                    <Button
                        variant="gray"
                        text="Navigate"
                        style={{flex: 1}}
                        onPress={() => {
                            console.log(directionLink);
                            Linking.openURL(directionLink!);
                        }}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
