import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {ScrollView, Text, View} from 'react-native';
import {styles} from './index.styles';

import PlusTealSvg from '@src/static/svgs/PlusTeal.svg';
import {useMyParkingLots} from './index.data';

export function LotManagement() {
    const {lots} = useMyParkingLots();

    return (
        <SafeAreaView>
            <Header title="Lot Management" rightButtonIcon={<PlusTealSvg width={24} height={24} />} />
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
