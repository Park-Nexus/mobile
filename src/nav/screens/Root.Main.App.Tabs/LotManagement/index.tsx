import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './index.styles';

import PlusTealSvg from '@src/static/svgs/PlusTeal.svg';
import {useMyParkingLots} from './index.data';
import {NavigationProp, NavigatorScreenParams, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';

export function LotManagement() {
    const {lots} = useMyParkingLots();
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    return (
        <SafeAreaView>
            <Header
                title="Lot Management"
                rightButtonIcon={<PlusTealSvg width={24} height={24} />}
                onRightButtonPress={() => navigation.navigate('ParkingLot__Add')}
            />
            <View style={styles.wrapper}>
                <ScrollView style={styles.lotListWrapper}>
                    {lots.map(lot => (
                        <Text key={lot.id}>{lot.name}</Text>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
