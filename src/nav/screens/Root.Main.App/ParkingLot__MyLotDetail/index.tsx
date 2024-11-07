import {NavigationProp, RouteProp} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {ScrollView, Text, View} from 'react-native';
import {useMyParkingLot} from './index.data';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {Header} from '@src/components/Header';
import FastImage from 'react-native-fast-image';

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList, 'ParkingLot__MyLotDetail'>;
};
export function ParkingLot__MyLotDetail({navigation, route}: ScreenProps) {
    const {lotId} = route.params;
    const {data: lot} = useMyParkingLot(lotId);

    return (
        <SafeAreaView>
            <Header title="My Parking Lot" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            <ScrollView>
                <View>
                    {/* Info ---------------------------------------------------------------- */}
                    <Text onPress={() => navigation.navigate('ParkingLot__Update', {lotId})}>Info (Click to edit)</Text>
                    <ScrollView horizontal>
                        {lot?.mediaUrls.map(url => (
                            <FastImage
                                key={url}
                                source={{uri: url}}
                                style={{width: 100, height: 100}}
                                resizeMode="cover"
                                fallback
                            />
                        ))}
                    </ScrollView>
                    <Text>{lot?.name}</Text>
                    <Text>{lot?.phone}</Text>
                    <Text>{lot?.description}</Text>
                    <Text>{lot?.isApproved}</Text>
                    <Text>{lot?.status}</Text>
                    <Text>
                        {lot?.openAt} - {lot?.closeAt}
                    </Text>
                    <Text>
                        {lot?.latitude} - {lot?.longitude}
                    </Text>
                    <Text>{lot?.createdAt}</Text>
                    <Text>{lot?.updatedAt}</Text>
                    <Text>{lot?.approvedAt}</Text>
                </View>

                {/* Prices ---------------------------------------------------------------- */}
                <View>
                    <Text onPress={() => navigation.navigate('ParkingLot__Prices__Manage', {lotId})}>
                        Prices (Click to edit)
                    </Text>
                    {lot?.parkingLotPrices.map((item, index) => (
                        <View key={index}>
                            <Text>{item.price}</Text>
                            <Text>{item.vehicleType}</Text>
                        </View>
                    ))}
                </View>

                {/* Services ---------------------------------------------------------------- */}
                <View>
                    <Text onPress={() => navigation.navigate('ParkingLot__Services__Manage', {lotId})}>
                        Services (Click to edit)
                    </Text>
                    {lot?.parkingLotServices.map((item, index) => (
                        <View key={index}>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.vehicleTypes}</Text>
                            <Text>{item.price}</Text>
                            <Text>{item.mediaUrls}</Text>
                        </View>
                    ))}
                </View>

                {/* Spots ---------------------------------------------------------------- */}
                <View>
                    <Text>Spots</Text>
                    {lot?.parkingSpots.map((item, index) => (
                        <View key={index}>
                            <Text>{item.name}</Text>
                            <Text>{item.vehicleType}</Text>
                            <Text>{item.isAvailable}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
