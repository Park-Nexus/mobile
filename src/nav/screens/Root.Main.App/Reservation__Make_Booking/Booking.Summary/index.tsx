import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useMakeBookingContext} from '../index.context';
import {ScrollView, Text} from 'react-native';
import {useParkingLotDetail} from '../index.data';
import {Button} from '@src/components/Button';
import {useCreateTicker} from './index.data';
import Toast from 'react-native-toast-message';
import {BookingSuccessModal, TBookingSuccessModalRef} from './index.modal';
import {useRef} from 'react';

export function Summary() {
    const {lotId, startTime, endTime, services, vehicle} = useMakeBookingContext();
    const {lot} = useParkingLotDetail();
    const {createTicket, isPending} = useCreateTicker();

    const successModalRef = useRef<TBookingSuccessModalRef>(null);

    const onBook = () => {
        if (!lotId || !vehicle) return Toast.show({type: 'error', text1: 'Something went wrong'});

        createTicket({
            parkingLotId: lotId,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            serviceIds: services.map(s => s.id),
            vehicleId: vehicle.id,
        }).then(({ticketId}) => successModalRef?.current?.show(ticketId));
    };

    const calcPrice = () => {
        if (!lot) return;
        if (!vehicle) return;

        let total = 0;

        services.forEach(service => {
            total += service.price;
        });

        const vehicleType = vehicle.type;
        const pricePerHour = lot.parkingLotPrices.find(p => p.vehicleType === vehicleType)?.price || 0;
        const parkingHours = endTime.diff(startTime, 'hours');

        return total + parkingHours * pricePerHour;
    };

    return (
        <SafeAreaView>
            <Header title="Payment" />
            <ScrollView>
                <Text>Estimated total: ${calcPrice()}</Text>
            </ScrollView>
            <Button variant="green" text="Book" onPress={onBook} />
            <BookingSuccessModal ref={successModalRef} />
        </SafeAreaView>
    );
}
