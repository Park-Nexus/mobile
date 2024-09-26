import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {styles} from './index.styles';

import EmailSvg from '@src/static/svgs/Envelope.svg';
import PasswordSvg from '@src/static/svgs/Lock.svg';
import {TextInput} from '@src/components/Input__Text';
import {Text, View} from 'react-native';
import {Button} from '@src/components/Button';
import GoogleSvg from '@src/static/svgs/Google.svg';
import {Header} from '@src/components/Header';

export function Login() {
  return (
    <SafeAreaView>
      <Header backButtonVisible />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Log in your Account</Text>

        <TextInput preIcon={<EmailSvg />} placeholder="Email" />
        <View style={{height: 8}} />
        <TextInput preIcon={<PasswordSvg />} placeholder="Password" />
        <View style={{height: 12}} />
        <Button variant="green" text="Log in" />

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
