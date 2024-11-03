import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AuthStackParamList} from '@src/nav/navigators/Root.Main.Auth';
import {View} from 'react-native';

export function Register() {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

    return (
        <SafeAreaView>
            <Header onBackButtonPress={navigation.goBack} backButtonVisible />
            <View style={{height: 52}} />
        </SafeAreaView>
    );
}
