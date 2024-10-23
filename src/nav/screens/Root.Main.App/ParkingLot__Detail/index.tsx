import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {RootStackParamList} from '@src/nav/navigators/Root.Main.App';
import {Image, Text, View} from 'react-native';
import {styles} from './index.styles';
import {useParkingLot} from './index.data';
import FastImage from 'react-native-fast-image';
import {useEffect, useState} from 'react';
import {reverseGeocode} from '@src/utils/location';

type ParkingLotDetailProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ParkingLot__Detail'>;
    route: RouteProp<RootStackParamList, 'ParkingLot__Detail'>;
};

export function ParkingLotDetail({route, navigation}: ParkingLotDetailProps) {
    const {lotId} = route.params;
    const {data: lot} = useParkingLot(lotId);

    const [address, setAddress] = useState<string>('');

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
            <View style={styles.wrapper}>
                {lot?.mediaUrls?.length && lot?.mediaUrls?.length > 0 && (
                    <FastImage source={{uri: lot?.mediaUrls[0]}} style={styles.image} resizeMode="cover" />
                )}
                <View style={styles.infoWrapper}>
                    <View style={styles.textWrapper}>
                        <Text style={styles.nameText}>{lot?.name}</Text>
                        <Text style={styles.addressText}>{address}</Text>
                    </View>
                </View>
                <Text>
                    {lot?.name} {lot?.mediaUrls}
                </Text>
            </View>
        </SafeAreaView>
    );
}
