import {TextInput as BaseTextInput, TextInputProps as BaseTextInputProps, View, ViewProps} from 'react-native';
import {styles} from './index.styles';

interface ITextInputProps extends BaseTextInputProps {
    wrapperProps?: ViewProps;
    preIcon?: React.ReactNode;
    postIcon?: React.ReactNode;
}

export function TextInput(props: ITextInputProps) {
    const {style, wrapperProps, preIcon, postIcon, ...rest} = props;

    const {style: wrapperStyle, ...restWrapperProps} = wrapperProps || {};

    return (
        <View {...restWrapperProps} style={[styles.wrapper, wrapperStyle]}>
            {preIcon}
            <BaseTextInput {...rest} style={[styles.textInput, style]} />
            {postIcon}
        </View>
    );
}
