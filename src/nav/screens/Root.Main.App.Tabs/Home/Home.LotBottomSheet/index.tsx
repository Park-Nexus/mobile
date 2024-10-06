import {Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useEffect, useRef} from 'react';
import {useHomeContext} from '../index.$context';

export function LotBottomSheet() {
  const {selectedLotId, setSelectedLotId} = useHomeContext();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (selectedLotId !== undefined) bottomSheetRef.current?.expand();
    else bottomSheetRef.current?.close();
  }, [selectedLotId]);

  return (
    <BottomSheet
      snapPoints={[200]}
      ref={bottomSheetRef}
      enablePanDownToClose
      onClose={() => setSelectedLotId(undefined)}>
      <BottomSheetView>
        <Text>Lot Bottom Sheet</Text>
      </BottomSheetView>
    </BottomSheet>
  );
}
