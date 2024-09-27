import {Text, View} from 'react-native';
import {styles} from './index.styles';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {Button} from '@src/components/Button';

import GoogleSvg from '@src/static/svgs/Google.svg';
import LockSvg from '@src/static/svgs/Lock.svg';
import {useNavigation} from '@react-navigation/native';

export function Intro() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{height: 52}} />
      <Text style={styles.title}>Let you in</Text>
      <View style={{height: 32}} />

      <Button
        style={styles.button}
        variant="gray"
        preIcon={<GoogleSvg width={24} height={24} />}
        text="Sign in with Google"
      />

      <View style={styles.dividerWrapper}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>

      <Button
        style={styles.button}
        variant="gray"
        preIcon={<LockSvg width={24} height={24} />}
        text="Sign in with Password"
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
}
