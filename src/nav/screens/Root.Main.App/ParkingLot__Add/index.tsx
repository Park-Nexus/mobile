import {NavigationProp, RouteProp, useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, Text, View} from 'react-native';
import {TCreateParkingLotPayload, useSubmit} from './index.submit';
import {TextInput} from '@src/components/Input__Text';
import {styles} from './index.styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useState} from 'react';
import {Button} from '@src/components/Button';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {Asset, launchImageLibrary, launchCamera} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import {useUpload} from '@src/utils/upload';

const MAX_ALLOWED_MEDIA_COUNT = 5;

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, 'ParkingLot__Add'>;
    route: RouteProp<AppStackParamList, 'ParkingLot__Add'>;
};

export function ParkingLot__Add({navigation}: ScreenProps) {
    const {showActionSheetWithOptions} = useActionSheet();

    const [selectedImages, setSelectedImages] = useState<Asset[]>([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [timeField, setTimeField] = useState<keyof TCreateParkingLotPayload>();

    const {submit, isPending} = useSubmit();
    const {isUploading, uploadParkingLotMedia} = useUpload();

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

    const selectOrTakeImage = () => {
        showActionSheetWithOptions(
            {
                options: ['Select from library', 'Take photo', 'Cancel'],
                cancelButtonIndex: 2,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    launchImageLibrary({mediaType: 'photo', selectionLimit: MAX_ALLOWED_MEDIA_COUNT}).then(
                        ({assets}) => {
                            if (assets) setSelectedImages(prev => [...prev, ...assets]);
                        },
                    );
                } else if (buttonIndex === 1) {
                    launchCamera({mediaType: 'photo'}).then(({assets}) => {
                        if (assets) setSelectedImages(prev => [...prev, ...assets]);
                    });
                }
            },
        );
    };

    const onSubmit = async (data: TCreateParkingLotPayload) => {
        let paths: string[] = [];
        if (selectedImages.length > 0) {
            paths = await uploadParkingLotMedia({
                files: selectedImages.map(image => ({uri: image.uri!, name: image.fileName!, type: image.type!})),
            });
        }
        submit({...data, mediaUrls: paths, latitude: Number(data.latitude), longitude: Number(data.longitude)});
    };

    return (
        <SafeAreaView>
            <Header title="Add new parking lot" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            <ScrollView style={styles.wrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {selectedImages.map((image, index) => (
                        <FastImage key={index} source={{uri: image.uri}} style={{width: 100, height: 100}} />
                    ))}
                    <Button variant="green" text="Select Images" onPress={selectOrTakeImage} />
                </ScrollView>
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
                    name="description"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            multiline
                            onChangeText={onChange}
                            placeholder="Description"
                            onBlur={onBlur}
                            value={value}
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

                <Controller
                    control={control}
                    name="latitude"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value.toString()}
                            placeholder="Latitude"
                            keyboardType="numeric"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="longitude"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value.toString()}
                            placeholder="Longitude"
                            keyboardType="numeric"
                        />
                    )}
                />
            </ScrollView>

            <Button
                variant="green"
                text={isPending || isUploading ? 'Saving...' : 'Save'}
                onPress={handleSubmit(onSubmit)}
                disabled={isPending || isUploading}
            />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </SafeAreaView>
    );
}
