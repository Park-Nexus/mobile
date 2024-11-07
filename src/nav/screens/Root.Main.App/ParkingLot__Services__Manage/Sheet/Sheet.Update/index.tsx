import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {forwardRef, useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useServiceManagerContext} from '../../index.context';
import {Controller, useForm} from 'react-hook-form';
import {TUpdateParkingLotServicePayload, useSubmit} from './index.submit';
import {useParkingLotService} from './index.data';
import {Asset, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from '@src/components/Button';
import {InputMultipleSelect} from '@src/components/Input__MultipleSelect';
import {Picker} from '@react-native-picker/picker';
import {PARKING_LOT_SERVICE__TYPE_ALIAS} from '@parknexus/api/prisma/client';
import {TextInput} from '@src/components/Input__Text';
import {useUpload} from '@src/utils/upload';

const MAX_ALLOWED_MEDIA_COUNT = 5;

type TExportServiceSheetProps = {
    onClose: () => void;
};
export const UpdateServiceSheet = forwardRef<BottomSheetModal, TExportServiceSheetProps>(({onClose}, ref) => {
    const {selectedServiceId, setSelectedServiceId} = useServiceManagerContext();
    const {service} = useParkingLotService();
    const {showActionSheetWithOptions} = useActionSheet();
    const {uploadParkingLotServiceMedia, isUploading} = useUpload();
    const {submit, isPending} = useSubmit();

    const [images, setImages] = useState<string[]>([]);
    const [removalImages, setRemovalImages] = useState<string[]>([]);
    const [additionalImages, setAdditionalImages] = useState<Asset[]>([]);

    const {setValue, control, handleSubmit} = useForm<TUpdateParkingLotServicePayload>({
        values: {
            serviceId: selectedServiceId!,
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

    const onSubmit = async (data: TUpdateParkingLotServicePayload) => {
        let additionalImagePaths;
        if (additionalImages.length > 0) {
            additionalImagePaths = await uploadParkingLotServiceMedia({
                files: additionalImages.map(image => ({uri: image.uri!, name: image.fileName!, type: image.type!})),
            });
        }

        submit(
            {
                ...data,
                additionalMediaUrls: additionalImagePaths,
                removalMediaUrls: removalImages,
                price: Number(data.price),
            },
            () => {
                onClose();
                setSelectedServiceId(undefined);
            },
        );
    };

    useEffect(() => {
        if (!service) return;

        setValue('name', service.name);
        setValue('type', service.type);
        setValue('description', service.description);
        setValue('price', service.price);
        setValue('type', service.type);
        setValue('vehicleTypes', service.vehicleTypes);
        setImages(service.mediaUrls);
    }, [selectedServiceId, service]);

    return (
        <BottomSheetModal
            ref={ref}
            enablePanDownToClose
            snapPoints={['80%']}
            onDismiss={() => setSelectedServiceId(undefined)}>
            <BottomSheetView>
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
                            <TextInput placeholder="Price" value={value?.toString()} onChangeText={onChange} />
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
                                selectedOptions={value || []}
                                onChange={onChange}
                            />
                        )}
                    />
                </ScrollView>
                <Button
                    variant="green"
                    text={isPending || isUploading ? 'Saving...' : 'Save'}
                    disabled={isPending || isUploading}
                    onPress={handleSubmit(onSubmit)}
                />
            </BottomSheetView>
        </BottomSheetModal>
    );
});
