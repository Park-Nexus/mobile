import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {styles} from './index.styles';

import EmailSvg from '@src/static/svgs/Envelope.svg';
import PasswordSvg from '@src/static/svgs/Lock.svg';
import {TextInput} from '@src/components/Input__Text';
import {Text, View} from 'react-native';
import {Button} from '@src/components/Button';

export function Login() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>Log in your Account</Text>
      <View style={{height: 42}} />
      <TextInput preIcon={<EmailSvg />} placeholder="Email" />
      <View style={{height: 8}} />
      <TextInput preIcon={<PasswordSvg />} placeholder="Password" />
      <View style={{height: 8}} />
      <Button variant="green" text="Log in" />
    </SafeAreaView>
  );
}
