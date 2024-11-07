import {ParkingLotService} from '@parknexus/api/prisma/client';
import constate from 'constate';
import {useState} from 'react';

type ServiceManagerContextProps = {
    lotId: number;
};
function useValues(props: ServiceManagerContextProps) {
    const [lotId] = useState(props.lotId);
    const [selectedService, setSelectedService] = useState<ParkingLotService>();

    return {
        lotId,

        selectedService,
        setSelectedService,
    };
}

export const [ServiceManagerContext, useServiceManagerContext] = constate(useValues);
