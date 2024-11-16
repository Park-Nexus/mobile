import React from "react";
import {BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {forwardRef, useState} from "react";
import {useServiceManagerContext} from "../../index.context";
import {TAddParkingLotServicePayload, useSubmit} from "./index.submit";
import {Controller, useForm} from "react-hook-form";
import {TextInput} from "@src/components/Input__Text";
import {ScrollView} from "react-native-gesture-handler";
import {Picker} from "@react-native-picker/picker";
import {PARKING_LOT_SERVICE__TYPE_ALIAS} from "@parknexus/api/prisma/client";
import {Button} from "@src/components/Button";
import {InputMultipleSelect} from "@src/components/Input__MultipleSelect";
import {Asset, launchCamera, launchImageLibrary} from "react-native-image-picker";
import {useActionSheet} from "@expo/react-native-action-sheet";
import FastImage from "react-native-fast-image";
import {useUpload} from "@src/utils/upload";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";
import {StyleSheet, Text, View} from "react-native";
import {BottomSheetBackdrop} from "@src/components/BottomSheetBackdrop";

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
            name: "",
            type: "TIRE_REPAIR",
            vehicleTypes: ["CAR"],
            description: "",
            price: 0,
            mediaUrls: [],
        },
    });

    const selectOrTakeImage = () => {
        showActionSheetWithOptions(
            {
                options: ["Select from library", "Take photo", "Cancel"],
                cancelButtonIndex: 2,
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    launchImageLibrary({mediaType: "photo", selectionLimit: MAX_ALLOWED_MEDIA_COUNT}).then(
                        ({assets}) => {
                            if (assets) setSelectedImages(prev => [...prev, ...assets]);
                        },
                    );
                } else if (buttonIndex === 1) {
                    launchCamera({mediaType: "photo"}).then(({assets}) => {
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
        submit({...data, mediaUrls, price: Number(String(data.price).replaceAll(",", "."))}, onClose);
    };

    return (
        <BottomSheetModal ref={ref} snapPoints={["85%"]} enablePanDownToClose backdropComponent={BottomSheetBackdrop}>
            <BottomSheetView style={styles.container}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                        {selectedImages.map((image, index) => (
                            <FastImage key={index} source={{uri: image.uri}} style={styles.image} />
                        ))}
                        <Button variant="gray" text="Add Image" onPress={selectOrTakeImage} />
                    </ScrollView>

                    <Text style={[styles.label, {marginBottom: 0}]}>Service Type</Text>
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
                    <View style={{height: 8}} />

                    <Text style={styles.label}>Vehicle Types</Text>
                    <Controller
                        control={control}
                        name="vehicleTypes"
                        render={({field: {onChange, value}}) => (
                            <InputMultipleSelect
                                options={[
                                    {label: "Car", value: "CAR"},
                                    {label: "Motorcycle", value: "MOTORCYCLE"},
                                    {label: "Truck", value: "TRUCK"},
                                ]}
                                selectedOptions={value}
                                onChange={onChange}
                            />
                        )}
                    />
                    <View style={{height: 8}} />

                    <Text style={styles.label}>Service Name</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="Name" value={value} onChangeText={onChange} />
                        )}
                    />
                    <View style={{height: 8}} />

                    <Text style={styles.label}>Description</Text>
                    <Controller
                        control={control}
                        name="description"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="Description" value={value} onChangeText={onChange} multiline />
                        )}
                    />
                    <View style={{height: 8}} />

                    <Text style={styles.label}>Price</Text>
                    <Controller
                        control={control}
                        name="price"
                        render={({field: {onChange, value}}) => (
                            <TextInput
                                placeholder="Price"
                                value={value.toString()}
                                onChangeText={onChange}
                                keyboardType="numeric"
                            />
                        )}
                    />
                    <View style={{height: 8}} />

                    <Button
                        variant="green"
                        text={isUploading || isPending ? "Saving..." : "Add"}
                        disabled={isPending || isUploading}
                        onPress={handleSubmit(onSubmit)}
                        style={styles.submitButton}
                    />
                </KeyboardAwareScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16},
    imageScroll: {marginBottom: 16},
    image: {width: 100, aspectRatio: 1, borderRadius: 8, marginRight: 8},
    label: {fontSize: 16, fontWeight: "600", marginBottom: 6, color: "#3f3f3f"},
    picker: {marginBottom: 16},
    submitButton: {marginBottom: 16, marginTop: 8},
});
