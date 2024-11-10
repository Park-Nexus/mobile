import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {ScrollView, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {TUpdateVehiclePayload, useSubmit} from './index.submit';
import {Controller, useForm} from 'react-hook-form';
import {useState} from 'react';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import {useUpload} from '@src/utils/upload';
import FastImage from 'react-native-fast-image';
import {Dimensions, Text, View} from 'react-native';
import {TextInput} from '@src/components/Input__Text';
import {Picker} from '@react-native-picker/picker';
import {Button} from '@src/components/Button';
import {VEHICLE__TYPE_ALIAS} from '@parknexus/api/prisma/client';
import {styles} from './index.styles';

const deviceWidth = Dimensions.get('window').width;

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, 'Settings__Vehicle_Update'>;
    route: RouteProp<AppStackParamList, 'Settings__Vehicle_Update'>;
};
export function Settings__Vehicle_Update({route, navigation}: ScreenProps) {
    const {vehicle} = route.params;

    const [selectedImage, setSelectedImage] = useState<Asset>();

    const {uploadVehicleImage, isUploading} = useUpload();
    const {submit, isPending} = useSubmit();
    const {control, handleSubmit} = useForm<TUpdateVehiclePayload>({
        values: {
            id: vehicle.id,
            plate: vehicle.plate,
            brand: vehicle.brand,
            color: vehicle.color,
            model: vehicle.model,
            type: vehicle.type,
        },
    });

    const openImagePicker = () => {
        launchImageLibrary({mediaType: 'photo', selectionLimit: 1}).then(async ({assets}) => {
            const asset = assets?.[0];
            if (!asset?.uri) return;
            setSelectedImage(asset);
        });
    };

    const onSubmit = async (data: TUpdateVehiclePayload) => {
        let imageUrl: string | undefined;
        if (selectedImage) {
            imageUrl = await uploadVehicleImage({
                file: {
                    uri: selectedImage.uri!,
                    name: selectedImage.fileName!,
                    type: selectedImage.type!,
                },
            });
        }
        submit({...data, imageUrl});
    };

    return (
        <SafeAreaView>
            <Header title="Update Vehicle" backButtonVisible onBackButtonPress={() => navigation.goBack()} />
            <ScrollView style={styles.wrapper}>
                <View style={{height: 8}} />
                {(selectedImage || vehicle.imageUrl) && (
                    <TouchableWithoutFeedback onPress={openImagePicker}>
                        <FastImage
                            source={{uri: selectedImage ? selectedImage.uri : vehicle.imageUrl}}
                            style={{width: deviceWidth - 16 * 2, height: (deviceWidth / 16) * 9, borderRadius: 8}}
                            resizeMode="cover"
                            fallback
                        />
                    </TouchableWithoutFeedback>
                )}
                <View style={{height: 8}} />
                {!selectedImage && (
                    <Button variant="gray" text="Select Image" onPress={openImagePicker} disabled={isUploading} />
                )}

                <View style={{height: 8}} />
                <Text style={styles.vehicleTypeLabel}>Vehicle type</Text>
                <Controller
                    control={control}
                    name="type"
                    render={({field: {onChange, value}}) => (
                        <Picker selectedValue={value} onValueChange={onChange} mode="dialog">
                            <Picker.Item label="Car" value={VEHICLE__TYPE_ALIAS.CAR} />
                            <Picker.Item label="Motorcycle" value={VEHICLE__TYPE_ALIAS.MOTORCYCLE} />
                            <Picker.Item label="Truck" value={VEHICLE__TYPE_ALIAS.TRUCK} />
                        </Picker>
                    )}
                />

                <View style={{height: 8}} />
                <Text style={styles.formFieldLabel}>Plate number</Text>
                <Controller
                    control={control}
                    name="plate"
                    render={({field: {onChange, value}}) => (
                        <TextInput placeholder="e.g. FL-029-RF" value={value} onChangeText={onChange} />
                    )}
                />

                <View style={{height: 8}} />
                <Text style={styles.formFieldLabel}>Brand</Text>
                <Controller
                    control={control}
                    name="brand"
                    render={({field: {onChange, value}}) => (
                        <TextInput placeholder="e.g. Ford" value={value} onChangeText={onChange} />
                    )}
                />

                <View style={{height: 8}} />
                <Text style={styles.formFieldLabel}>Model</Text>
                <Controller
                    control={control}
                    name="model"
                    render={({field: {onChange, value}}) => (
                        <TextInput placeholder="e.g. F-150" value={value} onChangeText={onChange} />
                    )}
                />

                <View style={{height: 8}} />
                <Text style={styles.formFieldLabel}>Color</Text>
                <Controller
                    control={control}
                    name="color"
                    render={({field: {onChange, value}}) => (
                        <TextInput placeholder="e.g. Red" value={value} onChangeText={onChange} />
                    )}
                />

                <Button
                    variant="green"
                    text={isPending || isUploading ? 'Saving...' : 'Save'}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isPending || isUploading}
                    style={styles.saveButton}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
