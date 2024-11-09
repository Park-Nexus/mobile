import constate from 'constate';
import {useState} from 'react';
import {TBookingStep} from './index.types';
import dayjs, {Dayjs} from 'dayjs';
import {MAX_AHEAD_TIME_ALLOWED_IN_HOURS, MINIMUM_DURATION_IN_HOURS} from '@parknexus/api/rules';

type TMakeBookingContextProps = {
    lotId: number;
};
function useValues(props: TMakeBookingContextProps) {
    const [lotId] = useState(props.lotId);

    const [step, setStep] = useState<TBookingStep>('DATE_TIME');

    const minimumStartTime = dayjs().add(15, 'minutes');
    const maximumStartTime = dayjs().add(MAX_AHEAD_TIME_ALLOWED_IN_HOURS, 'hour');
    const minimumEndTime = minimumStartTime.add(MINIMUM_DURATION_IN_HOURS, 'hour');

    const [startTime, setStartTime] = useState<Dayjs>(minimumStartTime);
    const [endTime, setEndTime] = useState<Dayjs>(minimumEndTime);
    const [serviceIds, setServiceIds] = useState<number[]>([]);
    const [vehicleId, setVehicleId] = useState<number>();

    return {
        lotId,

        step,
        setStep,

        startTime,
        setStartTime,

        endTime,
        setEndTime,

        serviceIds,
        setServiceIds,

        vehicleId,
        setVehicleId,

        minimumStartTime,
        maximumStartTime,
        minimumEndTime,
    };
}

export const [MakeBookingContext, useMakeBookingContext] = constate(useValues);
