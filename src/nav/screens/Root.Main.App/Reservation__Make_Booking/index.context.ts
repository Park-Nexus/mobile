import constate from 'constate';
import {useState} from 'react';

type TMakeBookingContextProps = {
    lotId: number;
};
function useValues(props: TMakeBookingContextProps) {
    const [lotId] = useState(props.lotId);

    return {
        lotId,
    };
}

export const [MakeBookingContext, useMakeBookingContext] = constate(useValues);
