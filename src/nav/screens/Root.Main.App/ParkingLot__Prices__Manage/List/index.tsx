import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {usePriceManagerContext} from '../index.context';
import {useMyParkingLotDetail} from '../index.data';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';

export function List() {
    const {lotId} = usePriceManagerContext();
    const {lot} = useMyParkingLotDetail(lotId);

    return (
        <SafeAreaView>
            <ScrollView>
                {lot?.parkingLotPrices.map((price, index) => (
                    <Text key={index}>
                        {price.price} - {price.vehicleType}
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
