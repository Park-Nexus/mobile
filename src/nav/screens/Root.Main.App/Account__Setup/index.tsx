import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {TCreateProfilePayload, useSubmit} from './index.data';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, View} from 'react-native';
import {styles} from './index.styles';
import {TextInput} from '@src/components/Input__Text';
import {Button} from '@src/components/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function AccountSetup() {
    const {} = useSafeAreaInsets();
    const {createProfile} = useSubmit();
    const {control, handleSubmit} = useForm<TCreateProfilePayload>({
        values: {
            firstName: '',
            lastName: '',
            phone: '',
            gender: 'MALE',
            avatarUrl: 'https://picsum.photos/200',
        },
    });

    return (
        <SafeAreaView>
            <Header title="Fill Your Profile" />
            <ScrollView style={styles.wrapper}>
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
            <Button variant="green" text="Continue" style={styles.submitButton} />
        </SafeAreaView>
    );
}
