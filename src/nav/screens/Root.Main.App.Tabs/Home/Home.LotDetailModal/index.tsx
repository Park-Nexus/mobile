import Modal from 'react-native-modal';
import {useHomeContext} from '../index.$context';
import {Text, View} from 'react-native';
import {styles} from './index.parts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '@src/components/Button';
import {useParkingLot} from './index.$data';
import {reverseGeocode} from '@src/utils/location';
import {useEffect, useState} from 'react';

export function LotDetailModal() {
  const {selectedLotId, setSelectedLotId} = useHomeContext();
  const {bottom} = useSafeAreaInsets();
  const {data: lot, isFetching} = useParkingLot();

  const [address, setAddress] = useState<string>('');
  const prices = lot?.parkingLotPrices || [];
  const maxPrice = prices.reduce((acc, price) => Math.max(acc, price.price), 0);
  const minPrice = prices.reduce((acc, price) => Math.min(acc, price.price), maxPrice);

  useEffect(() => {
    reverseGeocode({
      lat: lot?.latitude,
      lon: lot?.longitude,
    }).then(setAddress);
  }, [lot]);

  return (
    <Modal
      animationIn="slideInUp"
      animationInTiming={400}
      animationOut={'slideOutDown'}
      animationOutTiming={700}
      style={{justifyContent: 'flex-end', paddingBottom: bottom + 70}}
      isVisible={!!selectedLotId}
      hasBackdrop={false}
      swipeDirection="down"
      onSwipeComplete={() => setSelectedLotId(undefined)}
      coverScreen={false}>
      <View style={styles.wrapper}>
        <View style={styles.pill} />
        {isFetching ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <View style={styles.titleWrapper}>
              <View style={styles.titleItemWrapper}>
                <Text style={styles.titleText}>{lot?.name}</Text>
                <Text style={styles.subTitleText}>{address}</Text>
              </View>
              <View style={styles.titleItemWrapper}>
                <Text style={styles.titleText}>${minPrice}</Text>
                <Text style={styles.subTitleText}>per hour</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
}
