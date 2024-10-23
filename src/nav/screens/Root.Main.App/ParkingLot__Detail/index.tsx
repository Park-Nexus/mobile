import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {RootStackParamList} from '@src/nav/navigators/Root.Main.App';
import {Image, Text, View} from 'react-native';
import {styles} from './index.styles';
import {useParkingLot} from './index.data';
import FastImage from 'react-native-fast-image';

type ParkingLotDetailProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ParkingLot__Detail'>;
    route: RouteProp<RootStackParamList, 'ParkingLot__Detail'>;
};

export function ParkingLotDetail({route, navigation}: ParkingLotDetailProps) {
    const {lotId} = route.params;
    const {data: lot} = useParkingLot(lotId);

    return (
        <SafeAreaView>
            <Header backButtonVisible title="Parking Lot Details" onBackButtonPress={() => navigation.goBack()} />
            <View style={styles.wrapper}>
                {lot?.mediaUrls?.length && lot?.mediaUrls?.length > 0 && (
                    <FastImage source={{uri: lot?.mediaUrls[0]}} style={styles.image} resizeMode="cover" />
                )}
                <Text>
                    {lot?.name} {lot?.mediaUrls}
                </Text>
            </View>
        </SafeAreaView>
    );
}
