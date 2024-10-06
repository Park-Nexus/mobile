import {Text, View} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useEffect, useRef} from 'react';
import {useHomeContext} from '../index.$context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function LotBottomSheet() {
  const {selectedLotId, setSelectedLotId} = useHomeContext();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {bottom} = useSafeAreaInsets();

  useEffect(() => {
    if (selectedLotId !== undefined) bottomSheetRef.current?.expand();
    else bottomSheetRef.current?.close();
  }, [selectedLotId]);

  return (
    <BottomSheet
      bottomInset={bottom + 90}
      style={{marginLeft: 20, marginRight: 20}}
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
