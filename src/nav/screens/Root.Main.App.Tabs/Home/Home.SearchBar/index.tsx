import {styles} from './index.parts';
import {TextInput} from '@src/components/Input__Text';
import {BlurView} from '@react-native-community/blur';

import MagnifyingGlass from '@src/static/svgs/MagnifyingGlass.svg';

export function SearchBar() {
  return (
    <BlurView blurType="light" blurAmount={10} style={styles.wrapper}>
      <TextInput placeholder="Search" preIcon={<MagnifyingGlass />} />
    </BlurView>
  );
}
