import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import {TCreateParkingLotPayload} from './index.submit';
import {TextInput} from '@src/components/Input__Text';
import {styles} from './index.styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useState} from 'react';
import {Button} from '@src/components/Button';

const MAX_ALLOWED_MEDIA_COUNT = 5;

export function ParkingLotAdd() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [timeField, setTimeField] = useState<keyof TCreateParkingLotPayload>();

    const {control, handleSubmit, setValue} = useForm<TCreateParkingLotPayload>({
        values: {
            name: '',
            phone: '',
            latitude: 0,
            longitude: 0,
            openAt: '', // HH:MM
            closeAt: '', // HH:MM
            mediaUrls: [],
            description: '',
        },
    });

    const showDatePicker = (field: keyof TCreateParkingLotPayload) => {
        setTimeField(field);
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirm = (date: Date) => {
        const formattedTime = date.toTimeString().substring(0, 5);
        if (timeField === 'openAt') {
            setValue('openAt', formattedTime);
        } else if (timeField === 'closeAt') {
            setValue('closeAt', formattedTime);
        }
        hideDatePicker();
    };

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
                <Controller
                    control={control}
                    name="phone"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            multiline
                            onChangeText={onChange}
                            placeholder="Phone"
                            onBlur={onBlur}
                            value={value}
                            keyboardType="phone-pad"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="openAt"
                    render={({field: {value}}) => (
                        <View>
                            <Button
                                variant="green"
                                text="Select Opening Time"
                                onPress={() => showDatePicker('openAt')}
                            />
                            {value ? <Text>Opening Time: {value}</Text> : null}
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="closeAt"
                    render={({field: {value}}) => (
                        <View>
                            <Button
                                variant="green"
                                text="Select Closing Time"
                                onPress={() => showDatePicker('closeAt')}
                            />
                            {value ? <Text>Closing Time: {value}</Text> : null}
                        </View>
                    )}
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
