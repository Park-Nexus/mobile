import {styles} from './index.parts';
import {BlurView} from '@react-native-community/blur';

import MagnifyingGlass from '@src/static/svgs/MagnifyingGlass.svg';
import {TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export function SearchBar() {
  const {top} = useSafeAreaInsets();

  return (
    <BlurView blurType="light" blurAmount={8} style={[styles.wrapper, {top}]}>
      <MagnifyingGlass />
      <TextInput placeholder="Search" style={styles.textInput} />
    </BlurView>
  );
}
