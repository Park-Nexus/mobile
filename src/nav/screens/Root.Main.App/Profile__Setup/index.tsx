import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {TCreateProfilePayload, useSubmit} from './index.data';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {styles} from './index.styles';
import {TextInput} from '@src/components/Input__Text';
import {Button} from '@src/components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {UploadUtils} from '@src/utils/upload';

export function ProfileSetup() {
    const {bottom} = useSafeAreaInsets();
    const {submit, isPending} = useSubmit();
    const {control, handleSubmit} = useForm<TCreateProfilePayload>({
        values: {
            firstName: '',
            lastName: '',
            phone: '',
            gender: 'MALE',
            avatarUrl: 'https://picsum.photos/200',
        },
    });

    const test = () => {
        launchImageLibrary({mediaType: 'photo', selectionLimit: 1}).then(async ({assets}) => {
            const asset = assets?.[0];
            if (!asset) return;

            const formData = new FormData();
            formData.append('files', [
                {
                    uri: asset.uri,
                    name: asset.fileName,
                    type: asset.type,
                },
            ]);

            await UploadUtils.uploadFile(formData);
        });
    };

    return (
        <SafeAreaView>
            <Header title="Fill Your Profile" />
            <Button variant="green" text="Test" onPress={test} />
            <ScrollView style={styles.wrapper}>
                <View style={{height: 100}} />
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
                onPress={handleSubmit(submit)}
                disabled={isPending}
                variant="green"
                text="Continue"
                style={[styles.submitButton, {bottom}]}
            />
        </SafeAreaView>
    );
}
