import {
  TouchableOpacity,
  TouchableOpacityProps,
  TextProps,
  Text,
} from 'react-native';
import {styles} from './index.parts';

type TButtonVariant = 'green' | 'white' | 'gray' | 'pink';

interface IButtonProps extends TouchableOpacityProps {
  variant: TButtonVariant;

  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;

  text?: string;
  textProps?: TextProps;
}

export function Button(props: IButtonProps) {
  const {variant, preIcon, postIcon, text, textProps, ...rest} = props;

  const {style: buttonStyle, ...buttonRest} = rest;
  const {style: textStyle, ...textPropsRest} = textProps || {};

  const buttonColor = (variant: TButtonVariant) => {
    if (variant === 'green') return '#128085';
    if (variant === 'white') return '#FFF';
    if (variant === 'gray') return '#E5E5E5';
    if (variant === 'pink') return '#FFD0B6';
  };

  const textColor = (variant: TButtonVariant) => {
    if (variant === 'green') return '#FFF';
    if (variant === 'white') return '#128085';
    if (variant === 'gray') return '#000';
    if (variant === 'pink') return '#B33E00';
  };

  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        {backgroundColor: buttonColor(variant)},
        styles.button,
      ]}
      {...buttonRest}>
      {preIcon}
      <Text
        style={[textStyle, {color: textColor(variant)}, styles.text]}
        {...textPropsRest}>
        {text}
      </Text>
      {postIcon}
    </TouchableOpacity>
  );
}
