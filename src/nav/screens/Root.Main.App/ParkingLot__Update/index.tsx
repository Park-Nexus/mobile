import React from "react";
import _ from "lodash";
import {NavigationProp, RouteProp} from "@react-navigation/native";
import {Header} from "@src/components/Header";
import {SafeAreaView} from "@src/components/SafeAreaWrapper";
import {AppStackParamList} from "@src/nav/navigators/Root.Main.App";
import {useMyParkingLot} from "./index.data";
import {Controller, useForm} from "react-hook-form";
import {TUpdateParkingLotPayload, useSubmit} from "./index.submit";
import {useEffect, useState} from "react";
import {Asset, launchCamera, launchImageLibrary} from "react-native-image-picker";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {TextInput} from "@src/components/Input__Text";
import {Button} from "@src/components/Button";
import FastImage from "react-native-fast-image";
import {useActionSheet} from "@expo/react-native-action-sheet";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useUpload} from "@src/utils/upload";
import {styles} from "./index.styles";

const MAX_ALLOWED_MEDIA_COUNT = 5;

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, "ParkingLot__Update">;
    route: RouteProp<AppStackParamList, "ParkingLot__Update">;
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

        submit({
            ...data,
            additionalMediaUrls: additionalImagePaths,
            removalMediaUrls: removalImages,
            latitude: _.toNumber(_.toString(data.latitude).replace(",", ".")),
            longitude: _.toNumber(_.toString(data.longitude).replace(",", ".")),
        });
    };

    const showDatePicker = (field: keyof TUpdateParkingLotPayload) => {
        setTimeField(field);
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => setDatePickerVisibility(false);
    const handleConfirm = (date: Date) => {
        const formattedTime = date.toTimeString().substring(0, 5);
        if (timeField === "openAt") {
            setValue("openAt", formattedTime);
        } else if (timeField === "closeAt") {
            setValue("closeAt", formattedTime);
        }
        hideDatePicker();
    };

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
                            if (assets) setAdditionalImages(prev => [...prev, ...assets]);
                        },
                    );
                } else if (buttonIndex === 1) {
                    launchCamera({mediaType: "photo"}).then(({assets}) => {
                        if (assets) setAdditionalImages(prev => [...prev, ...assets]);
                    });
                }
            },
        );
    };

    useEffect(() => {
        if (!lot) return;

        setValue("name", lot.name);
        setValue("phone", lot.phone);
        setValue("description", lot.description);
        setValue("latitude", lot.latitude);
        setValue("longitude", lot.longitude);
        setValue("openAt", lot.openAt);
        setValue("closeAt", lot.closeAt);
        setImages([...lot.mediaUrls]);
    }, [lot, lotId]);

    return (
        <SafeAreaView>
            <Header title="Update parking lot" backButtonVisible onBackButtonPress={() => navigation.goBack()} />

            <ScrollView contentContainerStyle={styles.wrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
                    {images.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() =>
                                setRemovalImages(prev =>
                                    prev.includes(image) ? prev.filter(i => i !== image) : [...prev, image],
                                )
                            }
                            style={[styles.imagePreview, {opacity: removalImages.includes(image) ? 0.5 : 1}]}>
                            <FastImage source={{uri: image}} style={styles.imagePreview} resizeMode="cover" />
                        </TouchableOpacity>
                    ))}
                    {additionalImages.map(image => (
                        <TouchableOpacity
                            key={image.uri}
                            style={[styles.imagePreview, {opacity: additionalImages.includes(image) ? 0.5 : 1}]}
                            onPress={() => setAdditionalImages(prev => prev.filter(i => i.uri !== image.uri))}>
                            <FastImage
                                source={{uri: image.uri}}
                                style={styles.imagePreview}
                                resizeMode="cover"
                                fallback
                            />
                        </TouchableOpacity>
                    ))}
                    <Button variant="gray" text="Add Image" onPress={selectOrTakeImage} />
                </ScrollView>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Parking Lot Name</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="e.g. Cau Giay Parking" value={value} onChangeText={onChange} />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Contact Phone</Text>
                    <Controller
                        control={control}
                        name="phone"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="e.g. 0123456789" value={value} onChangeText={onChange} />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Description</Text>
                    <Controller
                        control={control}
                        name="description"
                        render={({field: {onChange, value}}) => (
                            <TextInput
                                placeholder="e.g. Cau Giay Parking"
                                value={value}
                                onChangeText={onChange}
                                multiline
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
                                text={value ? value : "Select"}
                                onPress={() => showDatePicker("openAt")}
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
                                text={value ? value : "Select"}
                                onPress={() => showDatePicker("closeAt")}
                            />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Latitude</Text>
                    <Controller
                        control={control}
                        name="latitude"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="e.g. 12.345" value={value?.toString()} onChangeText={onChange} />
                        )}
                    />
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.label}>Longitude</Text>
                    <Controller
                        control={control}
                        name="longitude"
                        render={({field: {onChange, value}}) => (
                            <TextInput
                                placeholder="e.g. 105.345345"
                                value={value?.toString()}
                                onChangeText={onChange}
                            />
                        )}
                    />
                </View>

                <Button
                    variant="green"
                    text={isPending || isUploading ? "Saving..." : "Update"}
                    disabled={isPending || isUploading}
                    onPress={handleSubmit(onSubmit)}
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
