import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {styles} from './index.styles';

import EmailSvg from '@src/static/svgs/Envelope.svg';
import PasswordSvg from '@src/static/svgs/Lock.svg';
import {TextInput} from '@src/components/Input__Text';

export function Login() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <TextInput preIcon={<EmailSvg />} placeholder="Email" />
      <TextInput preIcon={<PasswordSvg />} placeholder="Password" />
    </SafeAreaView>
  );
}
