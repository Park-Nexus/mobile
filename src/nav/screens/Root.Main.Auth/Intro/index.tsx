import {Text, View} from 'react-native';
import {styles} from './index.styles';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';

export function Intro() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>Let you in</Text>
    </SafeAreaView>
  );
}
