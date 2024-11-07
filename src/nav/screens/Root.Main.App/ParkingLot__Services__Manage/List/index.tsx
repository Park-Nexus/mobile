import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useServiceManagerContext} from '../index.context';
import {useMyParkingLotDetail} from './index.data';
import {Text} from 'react-native';
import {useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {AddServiceSheet} from '../Sheets/Add';
import {Button} from '@src/components/Button';

export function List() {
    const {lotId} = useServiceManagerContext();
    const {lot} = useMyParkingLotDetail(lotId);

    const addSheetRef = useRef<BottomSheet>(null);

    return (
        <SafeAreaView>
            <Header title="Services" />
            {lot?.parkingLotServices.map((service, index) => (
                <Text key={index}>
                    {service.name} - {service.price} - {service.type} - {service.description}
                </Text>
            ))}
            <Button variant="green" text="Add Service" onPress={() => addSheetRef.current?.expand()} />

            <AddServiceSheet ref={addSheetRef} onClose={() => addSheetRef.current?.close()} />
        </SafeAreaView>
    );
}
