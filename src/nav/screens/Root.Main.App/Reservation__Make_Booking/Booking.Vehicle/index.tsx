import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useMakeBookingContext} from '../index.context';
import {useParkingLotAvailability} from '../index.data';
import {ScrollView, Text} from 'react-native';
import {useMyVehicles} from './index.data';
import {Button} from '@src/components/Button';

export function Vehicle() {
    const {setStep, setVehicleId, vehicleId} = useMakeBookingContext();
    const {availableVehicleTypes} = useParkingLotAvailability();
    const {vehicles} = useMyVehicles();

    console.log(availableVehicleTypes);

    return (
        <SafeAreaView>
            <Header title="Select vehicle" backButtonVisible onBackButtonPress={() => setStep('DATE_TIME')} />
            <ScrollView>
                {vehicles.map(vehicle => (
                    <Text
                        key={vehicle.id}
                        onPress={() => setVehicleId(vehicle.id)}
                        style={{color: vehicle.id === vehicleId ? 'red' : 'black'}}>
                        {vehicle.plate} - Is available: {availableVehicleTypes.includes(vehicle.type) ? 'yes' : 'no'}
                    </Text>
                ))}
            </ScrollView>
            <Button variant="green" text="Next" onPress={() => setStep('SERVICES')} />
        </SafeAreaView>
    );
}
