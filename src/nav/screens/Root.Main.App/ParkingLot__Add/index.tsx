import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {TCreateParkingLotPayload} from './index.submit';
import {TextInput} from '@src/components/Input__Text';
import {styles} from './index.styles';

const MAX_ALLOWED_MEDIA_COUNT = 5;

export function ParkingLotAdd() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const {control, handleSubmit} = useForm<TCreateParkingLotPayload>({
        values: {
            name: '',
            phone: '',
            latitude: 0,
            longitude: 0,
            openAt: '',
            closeAt: '',
            mediaUrls: [],
            description: '',
        },
    });

    return (
        <SafeAreaView>
            <Header title="Add new parking lot" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            <ScrollView style={styles.wrapper}>
                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput multiline onChangeText={onChange} placeholder="Name" onBlur={onBlur} value={value} />
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
