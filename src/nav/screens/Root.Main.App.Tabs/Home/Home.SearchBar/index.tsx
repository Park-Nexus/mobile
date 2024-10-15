import {styles} from './index.parts';
import {BlurView} from '@react-native-community/blur';

import MagnifyingGlass from '@src/static/svgs/MagnifyingGlass.svg';
import {useSearchLocation} from '@src/utils/location';
import {Text, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type TSearchBarProps = {
  userLocation: {lat?: number; lon?: number};
};
export function SearchBar({userLocation: {lat, lon}}: TSearchBarProps) {
  const {query, setQuery, suggestions} = useSearchLocation({
    userLocation: {lat, lon},
  });
  const {top} = useSafeAreaInsets();

  return (
    <>
      <BlurView blurType="light" blurAmount={8} style={[styles.wrapper, {top}]}>
        <MagnifyingGlass />
        <TextInput placeholder="Search" style={styles.textInput} value={query} onChangeText={setQuery} />
      </BlurView>
      {suggestions.length > 0 && (
        <BlurView blurType="light" blurAmount={8} style={[styles.suggestions, {top: top + 62}]}>
          {suggestions.map((suggestion, index) => (
            <Text
              key={index}
              style={{marginBottom: 10}}
              onPress={() => console.log('selected cord', suggestion.lat, suggestion.lon)}>
              {suggestion.address}
            </Text>
          ))}
        </BlurView>
      )}
    </>
  );
}
