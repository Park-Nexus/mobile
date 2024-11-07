import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {useMyParkingLot} from './index.data';
import {Controller, useForm} from 'react-hook-form';
import {TUpdateParkingLotPayload, useSubmit} from './index.submit';
import {useEffect, useState} from 'react';
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from '@src/components/Input__Text';
import {Button} from '@src/components/Button';
import FastImage from 'react-native-fast-image';
import {useActionSheet} from '@expo/react-native-action-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useUpload} from '@src/utils/upload';

const MAX_ALLOWED_MEDIA_COUNT = 5;

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, 'ParkingLot__Update'>;
    route: RouteProp<AppStackParamList, 'ParkingLot__Update'>;
};
export function ParkingLot__Update({navigation, route}: ScreenProps) {
    const {lotId} = route.params;
    const {data: lot} = useMyParkingLot(lotId);
    const {showActionSheetWithOptions} = useActionSheet();

    const [images, setImages] = useState<string[]>([]);
    const [removalImages, setRemovalImages] = useState<string[]>([]);
    const [additionalImages, setAdditionalImages] = useState<Asset[]>([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [timeField, setTimeField] = useState<keyof TUpdateParkingLotPayload>();

    const {submit, isPending} = useSubmit();
    const {isUploading, uploadParkingLotMedia} = useUpload();
    const {control, handleSubmit, setValue} = useForm<TUpdateParkingLotPayload>({
        values: {
            id: lotId,
        },
    });

    const onSubmit = async (data: TUpdateParkingLotPayload) => {
        let additionalImagePaths;
        if (additionalImages.length > 0) {
            additionalImagePaths = await uploadParkingLotMedia({
                files: additionalImages.map(image => ({uri: image.uri!, name: image.fileName!, type: image.type!})),
            });
        }

        submit({...data, additionalMediaUrls: additionalImagePaths, removalMediaUrls: removalImages});
    };

    const showDatePicker = (field: keyof TUpdateParkingLotPayload) => {
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
                            if (assets) setAdditionalImages(prev => [...prev, ...assets]);
                        },
                    );
                } else if (buttonIndex === 1) {
                    launchCamera({mediaType: 'photo'}).then(({assets}) => {
                        if (assets) setAdditionalImages(prev => [...prev, ...assets]);
                    });
                }
            },
        );
    };

    useEffect(() => {
        if (!lot) return;

        setValue('name', lot.name);
        setValue('phone', lot.phone);
        setValue('description', lot.description);
        setValue('latitude', lot.latitude);
        setValue('longitude', lot.longitude);
        setValue('openAt', lot.openAt);
        setValue('closeAt', lot.closeAt);
        setImages([...lot.mediaUrls]);
    }, [lot, lotId]);

    return (
        <SafeAreaView>
            <Header title="Update parking lot" backButtonVisible onBackButtonPress={() => navigation.goBack()} />

            <ScrollView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {images.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                setRemovalImages(prev =>
                                    prev.includes(image) ? prev.filter(i => i !== image) : [...prev, image],
                                )
                            }
                            style={{width: 100, height: 100, opacity: removalImages.includes(image) ? 0.5 : 1}}>
                            <FastImage
                                source={{uri: image}}
                                style={{width: 100, height: 100}}
                                resizeMode="cover"
                                fallback
                            />
                        </TouchableOpacity>
                    ))}
                    {additionalImages.map(image => (
                        <TouchableOpacity
                            key={image.uri}
                            style={{width: 100, height: 100}}
                            onPress={() => setAdditionalImages(prev => prev.filter(i => i.uri !== image.uri))}>
                            <FastImage
                                source={{uri: image.uri}}
                                style={{width: 100, height: 100}}
                                resizeMode="cover"
                                fallback
                            />
                        </TouchableOpacity>
                    ))}
                    <Button variant="gray" text="Add" onPress={selectOrTakeImage} />
                </ScrollView>

                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, value, onBlur}}) => (
                        <TextInput placeholder="Enter name" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )}
                />

                <Controller
                    control={control}
                    name="phone"
                    render={({field: {onChange, value, onBlur}}) => (
                        <TextInput placeholder="Enter phone" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )}
                />

                <Controller
                    control={control}
                    name="description"
                    render={({field: {onChange, value, onBlur}}) => (
                        <TextInput
                            placeholder="Enter description"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            multiline
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
                    render={({field: {onChange, value, onBlur}}) => (
                        <TextInput
                            placeholder="Enter latitude"
                            value={value?.toString()}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="longitude"
                    render={({field: {onChange, value, onBlur}}) => (
                        <TextInput
                            placeholder="Enter longitude"
                            value={value?.toString()}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
            </ScrollView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Button
                variant="green"
                text={isPending || isUploading ? 'Saving...' : 'Update'}
                disabled={isPending || isUploading}
                onPress={handleSubmit(onSubmit)}
            />
        </SafeAreaView>
    );
}
