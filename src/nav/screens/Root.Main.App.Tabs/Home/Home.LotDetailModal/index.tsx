import Modal from 'react-native-modal';
import {useHomeContext} from '../index.$context';
import {Text, View} from 'react-native';
import {styles} from './index.styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '@src/components/Button';
import {useParkingLot} from './index.$data';
import {reverseGeocode} from '@src/utils/location';
import {useEffect, useState} from 'react';

import MapPinSvg from '@src/static/svgs/MapPinArea.svg';
import LetterPSvg from '@src/static/svgs/LetterCircleP.svg';
import CaretRightSvg from '@src/static/svgs/CaretRight.svg';
import {LOT_SERVICE_ICONS} from './index.types';

export function LotDetailModal() {
    const {selectedLotId, setSelectedLotId} = useHomeContext();
    const {bottom} = useSafeAreaInsets();
    const {data: lot, isFetching} = useParkingLot();

    const [address, setAddress] = useState<string>('');

    const prices = lot?.parkingLotPrices || [];
    const maxPrice = prices.reduce((acc, price) => Math.max(acc, price.price), 0);
    const minPrice = prices.reduce((acc, price) => Math.min(acc, price.price), maxPrice);

    const spotsAvailable = lot?.parkingSpots?.reduce((acc, spot) => {
        if (spot.isAvailable) return acc + 1;
        return acc;
    }, 0);

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

                <View style={styles.titleWrapper}>
                    <View style={styles.titleItemWrapper}>
                        <Text style={styles.titleText}>{lot?.name}</Text>
                        <Text style={styles.subTitleText}>{address}</Text>
                    </View>
                    <View style={styles.titleItemWrapper}>
                        <Text style={[styles.titleText, {textAlign: 'right'}]}>${minPrice}</Text>
                        <Text style={styles.subTitleText}>per hour</Text>
                    </View>
                </View>

                <View style={styles.summaryWrapper}>
                    <View style={styles.summaryItemWrapper}>
                        <MapPinSvg width={24} height={24} />
                        <Text style={styles.summaryText}>720m</Text>
                    </View>
                    <View style={styles.summaryItemWrapper}>
                        <LetterPSvg width={24} height={24} />
                        <Text style={styles.summaryText}>{spotsAvailable} slots</Text>
                    </View>
                </View>

                <View style={styles.detailWrapper}>
                    <View style={styles.servicesWrapper}>
                        {lot?.parkingLotServices?.map((service, index) => (
                            <View key={index}>{LOT_SERVICE_ICONS[service.type]}</View>
                        ))}
                    </View>
                    <Button
                        variant="white"
                        text="Details"
                        postIcon={<CaretRightSvg width={24} height={24} />}
                        style={styles.detailButton}
                    />
                </View>

                <Button variant="green" text="Book now" />
            </View>
        </Modal>
    );
}
