import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TCreateParkingLotPayload, useSubmit} from './index.submit';
import {TextInput} from '@src/components/Input__Text';
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
                    {selectedImages.map((image, index) => (
                        <FastImage key={index} source={{uri: image.uri}} style={styles.imagePreview} />
                    ))}
                    <Button variant="gray" text="Add Image" onPress={selectOrTakeImage} />
                </ScrollView>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Parking Lot Name</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                onChangeText={onChange}
                                placeholder="e.g. Long Park Cau Giay"
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Contact Phone Number</Text>
                    <Controller
                        control={control}
                        name="phone"
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                multiline
                                onChangeText={onChange}
                                placeholder="e.g. 0123456789"
                                onBlur={onBlur}
                                value={value}
                                keyboardType="phone-pad"
                            />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Description</Text>
                    <Controller
                        control={control}
                        name="description"
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                multiline
                                onChangeText={onChange}
                                placeholder="e.g. Long Park Cau Giay, near Cau Giay University"
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Time Start Checking In</Text>
                    <Controller
                        control={control}
                        name="openAt"
                        render={({field: {value}}) => (
                            <Button
                                variant="gray"
                                text={value ? value : 'Select'}
                                onPress={() => showDatePicker('openAt')}
                            />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Time Stop Checking In</Text>
                    <Controller
                        control={control}
                        name="closeAt"
                        render={({field: {value}}) => (
                            <Button
                                variant="gray"
                                text={value ? value : 'Select'}
                                onPress={() => showDatePicker('closeAt')}
                            />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Latitude</Text>
                    <Controller
                        control={control}
                        name="latitude"
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value.toString()}
                                placeholder="e.g. 10.7654321"
                                keyboardType="numeric"
                            />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Longitude</Text>
                    <Controller
                        control={control}
                        name="longitude"
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value.toString()}
                                placeholder="e.g. 106.1234567"
                                keyboardType="numeric"
                            />
                        )}
                    />
                </View>

                <Button
                    variant="green"
                    text={isPending || isUploading ? 'Saving...' : 'Save'}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending || isUploading}
                    style={styles.submitButton}
                />
            </ScrollView>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    imageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 10,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    selectImageButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#888',
    },
    formSection: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    submitButton: {
        marginBottom: 32,
    },
});
