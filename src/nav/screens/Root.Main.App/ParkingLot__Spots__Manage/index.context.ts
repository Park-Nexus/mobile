import {ParkingSpot} from '@parknexus/api/prisma/client';
import constate from 'constate';
import {useState} from 'react';

type SpotManagerContextProps = {
    lotId: number;
};

function useValues(props: SpotManagerContextProps) {
    const [lotId] = useState(props.lotId);

    const [selectedSpot, setSelectedSpot] = useState<ParkingSpot>();

    return {
        lotId,
        selectedSpot,
        setSelectedSpot,
    };
}

export const [SpotManagerContext, useSpotManagerContext] = constate(useValues);
