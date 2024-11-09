import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useMakeBookingContext} from '../index.context';
import {useParkingLotAvailability} from '../index.data';
import {ScrollView, Text} from 'react-native';
import {useMyVehicles} from './index.data';
import {Button} from '@src/components/Button';

export function Vehicle() {
    const {setStep, setVehicle, vehicle} = useMakeBookingContext();
    const {availableVehicleTypes} = useParkingLotAvailability();
    const {vehicles} = useMyVehicles();

    console.log(availableVehicleTypes);

    return (
        <SafeAreaView>
            <Header title="Select vehicle" backButtonVisible onBackButtonPress={() => setStep('DATE_TIME')} />
            <ScrollView>
                {vehicles.map(v => (
                    <Text
                        key={v.id}
                        onPress={() => setVehicle(v)}
                        style={{color: v.id === vehicle?.id ? 'red' : 'black'}}>
                        {v.plate} - Is available: {availableVehicleTypes.includes(v.type) ? 'yes' : 'no'}
                    </Text>
                ))}
            </ScrollView>
            <Button variant="green" text="Next" onPress={() => setStep('SERVICES')} />
        </SafeAreaView>
    );
}
