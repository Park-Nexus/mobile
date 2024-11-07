import {useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useMyParkingLotDetail} from './index.data';
import {useSpotManagerContext} from '../index.context';
import {ScrollView, Text, View} from 'react-native';
import {Button} from '@src/components/Button';

export function List() {
    const navigation = useNavigation();
    const {lotId} = useSpotManagerContext();
    const {lot} = useMyParkingLotDetail(lotId);

    return (
        <SafeAreaView>
            <Header title="Parking spots" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            <ScrollView>
                {lot?.parkingSpots.map(spot => (
                    <View key={spot.id} style={{width: 100, height: 100}}>
                        <Text>
                            {spot.name} - {spot.isAvailable ? 'Available' : 'Not Available'}
                        </Text>
                    </View>
                ))}
                <View style={{width: 100, height: 100}}>
                    <Button variant="gray" text="Add" onPress={() => {}} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
