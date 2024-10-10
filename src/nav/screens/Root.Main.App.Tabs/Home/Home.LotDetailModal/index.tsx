import Modal from 'react-native-modal';
import {useHomeContext} from '../index.$context';
import {View} from 'react-native';
import {styles} from './index.parts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '@src/components/Button';

export function LotDetailModal() {
  const {selectedLotId, setSelectedLotId} = useHomeContext();
  const {bottom} = useSafeAreaInsets();

  return (
    <Modal
      animationIn="slideInUp"
      animationInTiming={400}
      animationOut={'slideOutDown'}
      animationOutTiming={700}
      style={{justifyContent: 'flex-end', paddingBottom: bottom + 70}}
      isVisible={!!selectedLotId}
      hasBackdrop={false}
      coverScreen={false}
      propagateSwipe>
      <View style={styles.wrapper}>
        <Button variant="green" text="Close Me!" onPress={() => setSelectedLotId(undefined)} />
      </View>
    </Modal>
  );
}
