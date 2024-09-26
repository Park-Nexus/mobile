import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {View, ViewProps} from 'react-native';
import {PropsWithChildren} from 'react';

export function SafeAreaView({style, ...rest}: ViewProps) {
  const {top, bottom} = useSafeAreaInsets();
  return (
    <View
      {...rest}
      style={[
        style,
        {
          paddingTop: top,
          paddingBottom: bottom,
          flex: 1,
          backgroundColor: '#FFF',
        },
      ]}
    />
  );
}
