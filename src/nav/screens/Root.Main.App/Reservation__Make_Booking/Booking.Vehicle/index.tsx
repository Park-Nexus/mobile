import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useMakeBookingContext} from '../index.context';
import {useParkingLotAvailability} from '../index.data';

export function Vehicle() {
    const {setStep} = useMakeBookingContext();
    const {availableVehicleTypes} = useParkingLotAvailability();

    console.log(availableVehicleTypes);

    return (
        <SafeAreaView>
            <Header title="Select vehicle" backButtonVisible onBackButtonPress={() => setStep('DATE_TIME')} />
        </SafeAreaView>
    );
}
