import constate from 'constate';
import {useState} from 'react';

function useValues() {
  const [selectedLotId, setSelectedLotId] = useState<number | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lon: number} | undefined>();

  return {
    selectedLotId,
    setSelectedLotId,

    selectedLocation,
    setSelectedLocation,
  };
}

export const [HomeContext, useHomeContext] = constate(useValues);
