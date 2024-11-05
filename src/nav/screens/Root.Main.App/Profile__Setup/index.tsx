import RNFetchBlob from 'rn-fetch-blob';

import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {TCreateProfilePayload, useSubmit} from './index.data';
import {Controller, useForm} from 'react-hook-form';
import {Platform, ScrollView, View} from 'react-native';
import {styles} from './index.styles';
import {TextInput} from '@src/components/Input__Text';
import {Button} from '@src/components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchImageLibrary, Asset} from 'react-native-image-picker';
import {UploadUtils} from '@src/utils/upload';
import FastImage from 'react-native-fast-image';

import AvatarPlaceHolder from '@src/static/images/Profile.png';
import NotePencil from '@src/static/svgs/NotePencil.svg';
import {useState} from 'react';

export function ProfileSetup() {
    const {bottom} = useSafeAreaInsets();
    const [selectedAvatar, setSelectedAvatar] = useState<Asset>();
    const {submit, isPending} = useSubmit();
    const {control, handleSubmit, setValue} = useForm<TCreateProfilePayload>({
        values: {
            firstName: '',
            lastName: '',
            phone: '',
            gender: 'MALE',
            avatarUrl: '',
        },
    });

    const openImagePicker = () => {
        launchImageLibrary({mediaType: 'photo', selectionLimit: 1}).then(async ({assets}) => {
            const asset = assets?.[0];
            if (!asset?.uri) return;
            setSelectedAvatar(asset);
            // const formData = new FormData();
            // formData.append('file', {
            //     uri: asset.uri,
            //     type: asset.type,
            //     name: asset.fileName,
            // });

            // const path = await UploadUtils.uploadAvatar(formData);
            // console.log(path);
        });
    };

    const onSubmit = async (values: TCreateProfilePayload) => {
        let avatarUrl = '';
        if (selectedAvatar) {
            const formData = new FormData();
            formData.append('file', {
                uri: selectedAvatar.uri,
                type: selectedAvatar.type,
                name: selectedAvatar.fileName,
            });
            avatarUrl = await UploadUtils.uploadAvatar(formData);
        }
        submit({...values, avatarUrl});
    };

    return (
        <SafeAreaView>
            <Header title="Fill Your Profile" />

            <ScrollView style={styles.wrapper}>
                <Controller
                    control={control}
                    name="avatarUrl"
                    render={() => (
                        <View
                            style={{
                                width: 100,
                                height: 100,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                marginTop: 32,
                                marginBottom: 32,
                            }}>
                            <FastImage
                                source={selectedAvatar ? {uri: selectedAvatar.uri} : AvatarPlaceHolder}
                                resizeMode="cover"
                                style={{width: '100%', height: '100%', borderRadius: 50}}
                            />
                            <Button
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: 28,
                                    height: 28,
                                    borderRadius: 14,
                                }}
                                variant="green"
                                preIcon={<NotePencil width={16} height={16} />}
                                onPress={openImagePicker}
                            />
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="firstName"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput onChangeText={onChange} onBlur={onBlur} value={value} placeholder="First Name" />
                    )}
                />
                <View style={{height: 8}} />
                <Controller
                    control={control}
                    name="lastName"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Last Name" />
                    )}
                />
                <View style={{height: 8}} />
                <Controller
                    control={control}
                    name="phone"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            placeholder="Phone"
                            keyboardType="phone-pad"
                        />
                    )}
                />
            </ScrollView>
            <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isPending}
                variant="green"
                text="Continue"
                style={[styles.submitButton, {bottom}]}
            />
        </SafeAreaView>
    );
}
