import constate from 'constate';
import {useState} from 'react';

type PriceManagerContextProps = {
    lotId: number;
};
function useValue(props: PriceManagerContextProps) {
    const [lotId] = useState(props.lotId);

    return {
        lotId,
    };
}

export const [PriceManagerContext, usePriceManagerContext] = constate(useValue);
