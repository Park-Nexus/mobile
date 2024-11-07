import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useServiceManagerContext} from '../index.context';
import {useMyParkingLotDetail} from './index.data';
import {Text} from 'react-native';
import {useEffect, useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {AddServiceSheet} from '../Sheet/Sheet.Add';
import {Button} from '@src/components/Button';
import {useNavigation} from '@react-navigation/native';
import {UpdateServiceSheet} from '../Sheet/Sheet.Update';

export function List() {
    const navigation = useNavigation();
    const {lotId, setSelectedServiceId, selectedServiceId} = useServiceManagerContext();
    const {lot} = useMyParkingLotDetail(lotId);

    const addSheetRef = useRef<BottomSheetModal>(null);
    const updateSheetRef = useRef<BottomSheetModal>(null);

    useEffect(() => {
        if (selectedServiceId) {
            updateSheetRef.current?.present();
        }
    }, [selectedServiceId]);

    return (
        <SafeAreaView>
            <Header title="Services" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            {lot?.parkingLotServices.map((service, index) => (
                <Text key={index} onPress={() => setSelectedServiceId(service.id)}>
                    {service.name} - {service.price} - {service.type} - {service.description}
                </Text>
            ))}
            <Button variant="green" text="Add Service" onPress={() => addSheetRef.current?.present()} />

            <AddServiceSheet ref={addSheetRef} onClose={() => addSheetRef.current?.dismiss()} />
            {selectedServiceId && (
                <UpdateServiceSheet ref={updateSheetRef} onClose={() => updateSheetRef.current?.dismiss()} />
            )}
        </SafeAreaView>
    );
}
