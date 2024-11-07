import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {forwardRef, useRef, useState} from 'react';
import {useServiceManagerContext} from '../../index.context';
import {TAddParkingLotServicePayload, useSubmit} from './index.submit';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from '@src/components/Input__Text';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {PARKING_LOT_SERVICE__TYPE_ALIAS} from '@parknexus/api/prisma/client';
import {Button} from '@src/components/Button';
import {InputMultipleSelect} from '@src/components/Input__MultipleSelect';
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import FastImage from 'react-native-fast-image';
import {useUpload} from '@src/utils/upload';

const MAX_ALLOWED_MEDIA_COUNT = 5;

type TExportServiceSheetProps = {
    onClose: () => void;
};
export const AddServiceSheet = forwardRef<BottomSheetModal, TExportServiceSheetProps>(({onClose}, ref) => {
    const {lotId} = useServiceManagerContext();

    const {submit, isPending} = useSubmit();
    const {uploadParkingLotServiceMedia, isUploading} = useUpload();

    const {showActionSheetWithOptions} = useActionSheet();
    const [selectedImages, setSelectedImages] = useState<Asset[]>([]);

    const {control, handleSubmit} = useForm<TAddParkingLotServicePayload>({
        values: {
            parkingLotId: lotId,
            name: '',
            type: 'TIRE_REPAIR',
            vehicleTypes: ['CAR'],
            description: '',
            price: 0,
            mediaUrls: [],
        },
    });

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

    const onSubmit = async (data: TAddParkingLotServicePayload) => {
        let mediaUrls: string[] = [];
        if (selectedImages.length > 0) {
            mediaUrls = await uploadParkingLotServiceMedia({
                files: selectedImages.map(image => ({uri: image.uri!, name: image.fileName!, type: image.type!})),
            });
        }
        submit({...data, mediaUrls, price: Number(data.price)}, onClose);
    };

    return (
        <BottomSheetModal ref={ref} snapPoints={['80%']} enablePanDownToClose>
            <BottomSheetView>
                <ScrollView>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {selectedImages.map((image, index) => (
                            <FastImage key={index} source={{uri: image.uri}} style={{width: 100, height: 100}} />
                        ))}
                        <Button variant="green" text="Select Images" onPress={selectOrTakeImage} />
                    </ScrollView>
                    <Controller
                        control={control}
                        name="name"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="Name" value={value} onChangeText={onChange} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="description"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="Description" value={value} onChangeText={onChange} multiline />
                        )}
                    />
                    <Controller
                        control={control}
                        name="price"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="Price" value={value.toString()} onChangeText={onChange} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="type"
                        render={({field: {onChange, value}}) => (
                            <Picker selectedValue={value} onValueChange={onChange} mode="dialog">
                                {Object.values(PARKING_LOT_SERVICE__TYPE_ALIAS).map(type => (
                                    <Picker.Item key={type} label={type} value={type} />
                                ))}
                            </Picker>
                        )}
                    />
                    <Controller
                        control={control}
                        name="vehicleTypes"
                        render={({field: {onChange, value}}) => (
                            <InputMultipleSelect
                                options={[
                                    {label: 'Car', value: 'CAR'},
                                    {label: 'Motorcycle', value: 'MOTORCYCLE'},
                                    {label: 'Truck', value: 'TRUCK'},
                                ]}
                                selectedOptions={value}
                                onChange={onChange}
                            />
                        )}
                    />
                </ScrollView>
                <Button
                    variant="green"
                    text={isUploading || isPending ? 'Saving...' : 'Add'}
                    disabled={isPending || isUploading}
                    onPress={handleSubmit(onSubmit)}
                />
            </BottomSheetView>
        </BottomSheetModal>
    );
});
