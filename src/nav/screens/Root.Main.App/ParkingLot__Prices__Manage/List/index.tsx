import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {usePriceManagerContext} from '../index.context';
import {useMyParkingLotDetail} from './index.data';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useRef} from 'react';
import {Header} from '@src/components/Header';
import {useNavigation} from '@react-navigation/native';
import {AddPriceSheet} from '../Sheet/index.addPriceSheet';
import {Button} from '@src/components/Button';

export function List() {
    const navigation = useNavigation();
    const {lotId} = usePriceManagerContext();
    const {lot} = useMyParkingLotDetail(lotId);

    const sheetRef = useRef<BottomSheet>(null);

    return (
        <SafeAreaView>
            <Header title="Parking Lot Prices" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            <ScrollView>
                {lot?.parkingLotPrices.map((price, index) => (
                    <Text key={index}>
                        {price.price} - {price.vehicleType}
                    </Text>
                ))}
            </ScrollView>
            <Button variant="green" text="Add Price" onPress={() => sheetRef.current?.expand()} />
            <AddPriceSheet ref={sheetRef} onClose={() => sheetRef.current?.close()} />
        </SafeAreaView>
    );
}
