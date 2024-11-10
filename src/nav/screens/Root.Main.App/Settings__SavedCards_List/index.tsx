import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {usePaymentMethods} from './index.data';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';

import PlusTealSvg from '@src/static/svgs/PlusTeal.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {Text} from 'react-native';

export function Settings__SavedCards_List() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const {paymentMethods} = usePaymentMethods();

    return (
        <SafeAreaView>
            <Header
                title="Saved Cards"
                backButtonVisible
                onBackButtonPress={() => navigation.goBack()}
                rightButtonIcon={<PlusTealSvg />}
                onRightButtonPress={() => navigation.navigate('Settings__SavedCards_Add')}
            />
            <ScrollView>
                {paymentMethods.map(method => (
                    <Text key={method.id}>
                        {method.card?.brand} {method.card?.issuer} - {method.card?.last4}
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
