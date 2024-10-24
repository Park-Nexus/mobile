import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {RootStackParamList} from '@src/nav/navigators/Root.Main.App';
import {Image, Text, View, Dimensions, ActivityIndicator} from 'react-native';
import {styles} from './index.styles';
import {useParkingLot} from './index.data';
import FastImage from 'react-native-fast-image';
import {useEffect, useState} from 'react';
import {reverseGeocode} from '@src/utils/location';
import Carousel from 'react-native-reanimated-carousel';
import {Button} from '@src/components/Button';

import StarFilledSvg from '@src/static/svgs/StarFilled.svg';
import MapPinAreaSvg from '@src/static/svgs/MapPinArea.svg';
import ClockSvg from '@src/static/svgs/Clock.svg';
import PhoneCallSvg from '@src/static/svgs/PhoneCall.svg';
import ArrowBendDoubleUpRight from '@src/static/svgs/ArrowBendDoubleUpRight.svg';
import ShareSvg from '@src/static/svgs/Share.svg';

const deviceWidth = Dimensions.get('window').width;
const imageHeight = deviceWidth * (9 / 16);

type ParkingLotDetailProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ParkingLot__Detail'>;
    route: RouteProp<RootStackParamList, 'ParkingLot__Detail'>;
};

export function ParkingLotDetail({route, navigation}: ParkingLotDetailProps) {
    const {lotId} = route.params;
    const {data: lot} = useParkingLot(lotId);

    const [address, setAddress] = useState<string>('');
    const [isFetchingImages, setIsFetchingImages] = useState<boolean>(false);
    const isMediaExists = lot?.mediaUrls && lot?.mediaUrls.length > 0;

    useEffect(() => {
        if (lot) {
            reverseGeocode({
                lat: lot.latitude,
                lon: lot.longitude,
            }).then(setAddress);
        }
    }, [lot]);

    return (
        <SafeAreaView>
            <Header backButtonVisible title="Parking Lot Details" onBackButtonPress={() => navigation.goBack()} />
            <View style={{height: 16}} />
            {isMediaExists && (
                <>
                    <View style={{height: imageHeight}}>
                        {isFetchingImages ? <ActivityIndicator style={{marginTop: imageHeight / 2}} /> : null}
                        <Carousel
                            width={deviceWidth}
                            data={lot?.mediaUrls || []}
                            renderItem={({item, index}) => (
                                <View key={index} style={styles.imageWrapper}>
                                    <FastImage
                                        source={{uri: `${item}`}}
                                        style={{width: '100%', height: imageHeight}}
                                        resizeMode="cover"
                                        fallback
                                        onLoadStart={() => setIsFetchingImages(true)}
                                        onLoadEnd={() => setIsFetchingImages(false)}
                                    />
                                </View>
                            )}
                            snapEnabled
                            autoPlay
                            autoPlayInterval={3000}
                        />
                    </View>
                    <View style={{height: 16}} />
                </>
            )}

            <View style={styles.wrapper}>
                <View style={styles.infoWrapper}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.nameText}>{lot?.name}</Text>
                        <Text style={styles.addressText}>{address}</Text>
                    </View>

                    <View style={styles.pillsWrapper}>
                        <View style={styles.pill}>
                            <StarFilledSvg width={20} height={20} />
                            <Text style={styles.pillText}>4.2</Text>
                        </View>
                        <View style={styles.pill}>
                            <MapPinAreaSvg width={20} height={20} />
                            <Text style={styles.pillText}>4.2</Text>
                        </View>
                        <View style={styles.pill}>
                            <ClockSvg width={20} height={20} />
                            <Text style={styles.pillText}>4.2</Text>
                        </View>
                    </View>

                    <View style={styles.infoButtonsWrapper}>
                        <Button variant="gray" preIcon={<PhoneCallSvg width={16} height={16} />} text="Call" />
                        <Button
                            variant="gray"
                            preIcon={<ArrowBendDoubleUpRight width={16} height={16} />}
                            text="Direction"
                        />
                        <Button variant="green" preIcon={<ShareSvg width={16} height={16} />} text="Share" />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
