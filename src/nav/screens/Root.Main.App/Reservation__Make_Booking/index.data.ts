import {trpc} from '@src/trpc';
import {useMakeBookingContext} from './index.context';

export function useParkingLotAvailability() {
    const {lotId, startTime} = useMakeBookingContext();

    const response = trpc.parking.lot.availability.get.useQuery({
        lotId,
        startTime: startTime.toISOString(),
    });

    const availableVehicleTypes = response.data?.availableVehicleTypes || [];

    return Object.assign({availableVehicleTypes}, response);
}
