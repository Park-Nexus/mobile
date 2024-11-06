import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AppStackParamList} from '@src/nav/navigators/Root.Main.App';
import {useMyParkingLot} from './index.data';
import {Controller, useForm} from 'react-hook-form';
import {TUpdateParkingLotPayload} from './index.submit';
import {useEffect, useState} from 'react';
import {Asset} from 'react-native-image-picker';
import {ScrollView} from 'react-native';
import {TextInput} from '@src/components/Input__Text';
import {Button} from '@src/components/Button';
import FastImage from 'react-native-fast-image';

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, 'ParkingLot__Update'>;
    route: RouteProp<AppStackParamList, 'ParkingLot__Update'>;
};
export function ParkingLot__Update({navigation, route}: ScreenProps) {
    const {lotId} = route.params;
    const {data: lot} = useMyParkingLot(lotId);

    const [images, setImages] = useState<string[]>([]);
    const [additionalImages, setAdditionalImages] = useState<Asset[]>([]);

    const {control, handleSubmit, setValue} = useForm<TUpdateParkingLotPayload>({
        values: {
            id: lotId,
        },
    });

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
                        <FastImage
                            key={index}
                            source={{uri: image}}
                            style={{width: 100, height: 100}}
                            resizeMode="cover"
                            fallback
                        />
                    ))}
                    {additionalImages.map((image, index) => (
                        <FastImage
                            key={index}
                            source={{uri: image.uri}}
                            style={{width: 100, height: 100}}
                            resizeMode="cover"
                            fallback
                        />
                    ))}
                    <Button variant="gray" text="Add" />
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
            <Button variant="green" text="Update" />
        </SafeAreaView>
    );
}
