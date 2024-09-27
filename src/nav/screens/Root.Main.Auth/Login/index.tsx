import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {styles} from './index.styles';

import {TextInput} from '@src/components/Input__Text';
import {Text, View, TouchableOpacity} from 'react-native';
import {Button} from '@src/components/Button';
import {Header} from '@src/components/Header';
import {Controller, useForm} from 'react-hook-form';

import EmailSvg from '@src/static/svgs/Envelope.svg';
import PasswordSvg from '@src/static/svgs/Lock.svg';
import GoogleSvg from '@src/static/svgs/Google.svg';
import EyeSvg from '@src/static/svgs/Eye.svg';
import {useState} from 'react';
import {TLoginPayload, useSubmit} from './index.submit';
import {useNavigation} from '@react-navigation/native';

export function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {control, handleSubmit} = useForm<TLoginPayload>({
    values: {
      email: 'vclong2003@gmail.com',
      password: '12345678',
    },
  });
  const {submit, isPending} = useSubmit();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <Header onBackButtonPress={navigation.goBack} backButtonVisible />
      <View style={{height: 52}} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Log in your Account</Text>
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
              defaultValue="vclong2003@gmail.com"
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
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <EyeSvg width={20} height={20} />
                </TouchableOpacity>
              }
              placeholder="Password"
              defaultValue="12345678"
            />
          )}
        />
        <View style={{height: 12}} />
        <Button
          variant="green"
          text="Log in"
          disabled={isPending}
          onPress={handleSubmit(submit)}
        />

        <View style={{height: 24}} />
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>

        <View style={styles.dividerWrapper}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.oauthButtonWrapper}>
          <Button
            variant="gray"
            preIcon={<GoogleSvg width={24} height={24} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
