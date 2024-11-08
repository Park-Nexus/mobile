import constate from 'constate';
import {useState} from 'react';
import {TBookingStep} from './index.types';
import dayjs from 'dayjs';

type TMakeBookingContextProps = {
    lotId: number;
};
function useValues(props: TMakeBookingContextProps) {
    const [lotId] = useState(props.lotId);

    // can only book ahead of maximum 48 hours
    const lowBoundaryDate = dayjs().add(15, 'minutes');
    const highBoundaryDate = dayjs().add(48, 'hours').subtract(15, 'minutes');

    const [step, setStep] = useState<TBookingStep>('DATE_TIME');

    const [startTime, setStartTime] = useState<Date>(lowBoundaryDate.toDate());
    const [serviceIds, setServiceIds] = useState<number[]>([]);
    const [vehicleId, setVehicleId] = useState<number>();

    return {
        lotId,

        step,
        setStep,

        startTime,
        setStartTime,

        serviceIds,
        setServiceIds,

        vehicleId,
        setVehicleId,

        lowBoundaryDate,
        highBoundaryDate,
    };
}

export const [MakeBookingContext, useMakeBookingContext] = constate(useValues);
