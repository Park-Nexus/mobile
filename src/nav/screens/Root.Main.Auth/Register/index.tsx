import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {AuthStackParamList} from '@src/nav/navigators/Root.Main.Auth';
import {Controller, useForm} from 'react-hook-form';
import {Text, View} from 'react-native';
import {TRegisterPayload, useSubmit} from './index.submit';
import {Button} from '@src/components/Button';
import {styles} from './index.styles';

import EmailSvg from '@src/static/svgs/Envelope.svg';
import PasswordSvg from '@src/static/svgs/Lock.svg';
import GoogleSvg from '@src/static/svgs/Google.svg';
import EyeSvg from '@src/static/svgs/Eye.svg';

import {TextInput} from '@src/components/Input__Text';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function Register() {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const {submit, isPending} = useSubmit();
    const {control, handleSubmit} = useForm<TRegisterPayload>({
        values: {
            email: '',
            password: '',
            passwordRetype: '',
        },
    });

    const {bottom} = useSafeAreaInsets();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    return (
        <SafeAreaView>
            <Header onBackButtonPress={navigation.goBack} backButtonVisible />
            <View style={{height: 52}} />
            <View style={styles.wrapper}>
                <Text style={styles.title}>Create your Account</Text>
                <View style={{height: 42}} />

                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            preIcon={<EmailSvg width={24} height={24} />}
                            placeholder="Email"
                        />
                    )}
                />
                <View style={{height: 8}} />
                <Controller
                    control={control}
                    name="password"
                    render={({field: {onBlur, onChange, value}}) => (
                        <TextInput
                            secureTextEntry={!isPasswordVisible}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            preIcon={<PasswordSvg width={24} height={24} />}
                            postIcon={
                                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    <EyeSvg width={20} height={20} />
                                </TouchableOpacity>
                            }
                            placeholder="Password"
                        />
                    )}
                />
                <View style={{height: 8}} />
                <Controller
                    control={control}
                    name="passwordRetype"
                    render={({field: {onBlur, onChange, value}}) => (
                        <TextInput
                            secureTextEntry={!isPasswordVisible}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            preIcon={<PasswordSvg width={24} height={24} />}
                            placeholder="Retype Password"
                        />
                    )}
                />
                <View style={{height: 12}} />
                <Button variant="green" text="Continue" disabled={isPending} onPress={handleSubmit(submit)} />

                <View style={styles.dividerWrapper}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or continue with</Text>
                    <View style={styles.dividerLine} />
                </View>

                <View style={styles.oauthButtonWrapper}>
                    <Button variant="gray" preIcon={<GoogleSvg width={24} height={24} />} />
                </View>
            </View>
            <Text style={[styles.loginText, {bottom: bottom + 16}]} onPress={() => navigation.navigate('Login')}>
                Already have an account? <Text style={styles.loginTextColored}>Log in</Text>
            </Text>
        </SafeAreaView>
    );
}
