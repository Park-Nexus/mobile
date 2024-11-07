import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useVehicles} from './index.data';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';

import PlusTealSvg from '@src/static/svgs/PlusTeal.svg';
import {Text} from 'react-native';

export function Settings__Vehicle_List() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const {vehicles} = useVehicles();

    return (
        <SafeAreaView>
            <Header
                title="My Vehicles"
                backButtonVisible
                onBackButtonPress={() => navigation.goBack()}
                rightButtonIcon={<PlusTealSvg />}
                onRightButtonPress={() => navigation.navigate('Settings__Vehicle_Add')}
            />
            {vehicles.map(vehicle => (
                <Text key={vehicle.id} onPress={() => navigation.navigate('Settings__Vehicle_Update', {vehicle})}>
                    {vehicle.plate}
                </Text>
            ))}
        </SafeAreaView>
    );
}
