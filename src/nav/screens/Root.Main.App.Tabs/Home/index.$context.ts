import constate from 'constate';
import {useState} from 'react';

function useValues() {
  const [selectedLotId, setSelectedLotId] = useState<number | undefined>();

  return {selectedLotId, setSelectedLotId};
}

export const [HomeContext, useHomeContext] = constate(useValues);
