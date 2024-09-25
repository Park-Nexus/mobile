import {TextInput as BaseTextInput, TextInputProps, View} from 'react-native';
import {styles} from './index.styles';

export function TextInput(props: TextInputProps) {
  const {style, ...rest} = props;

  return (
    <View style={[styles.wrapper]}>
      <BaseTextInput {...rest} style={[styles.textInput, style]} />
    </View>
  );
}
