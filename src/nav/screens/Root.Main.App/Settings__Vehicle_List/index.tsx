import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useVehicles} from './index.data';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';

import PlusTealSvg from '@src/static/svgs/PlusTeal.svg';
import {ScrollView, Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from './index.styles';
import FastImage from 'react-native-fast-image';

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
            <ScrollView style={styles.wrapper}>
                {vehicles.map(vehicle => (
                    <TouchableWithoutFeedback
                        key={vehicle.id}
                        onPress={() => navigation.navigate('Settings__Vehicle_Update', {vehicle})}>
                        <FastImage
                            source={{uri: vehicle.imageUrl}}
                            style={{width: 100, height: 100}}
                            resizeMode="cover"
                            fallback
                        />
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
