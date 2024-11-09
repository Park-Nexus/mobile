import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useMakeBookingContext} from '../index.context';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from '@src/components/Button';
import {useParkingLotDetail} from '../index.data';
import {Text} from 'react-native';
import {useRef} from 'react';
import {ServiceDetailSheet, TServiceDetailSheetRef} from './index.sheet';

export function Services() {
    const {setStep, services} = useMakeBookingContext();
    const {lot} = useParkingLotDetail();

    const detailSheetRef = useRef<TServiceDetailSheetRef>(null);

    return (
        <SafeAreaView>
            <Header title="Select Services" backButtonVisible onBackButtonPress={() => setStep('VEHICLE')} />
            <ScrollView>
                {lot?.parkingLotServices.map(service => (
                    <Text key={service.id} onPress={() => detailSheetRef?.current?.show(service.id)}>
                        {service.name} - {service.price} - {service.type} - {service.description}
                    </Text>
                ))}
            </ScrollView>
            <ServiceDetailSheet ref={detailSheetRef} />
            <Button variant="green" text="Next" onPress={() => setStep('SUMMARY')} />
        </SafeAreaView>
    );
}
