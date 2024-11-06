import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {ScrollView} from 'react-native';

export function ParkingLotAdd() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    return (
        <SafeAreaView>
            <Header title="Add new parking lot" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            <ScrollView></ScrollView>
        </SafeAreaView>
    );
}
