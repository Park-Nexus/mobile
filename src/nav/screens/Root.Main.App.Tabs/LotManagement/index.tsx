import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {Text, View} from 'react-native';
import {styles} from './index.styles';

import PlusTealSvg from '@src/static/svgs/Plus.svg';

export function LotManagement() {
    return (
        <SafeAreaView>
            <Header title="Lot Management" rightButtonIcon={<PlusTealSvg width={24} height={24} />} />
            <View style={styles.wrapper}></View>
        </SafeAreaView>
    );
}
