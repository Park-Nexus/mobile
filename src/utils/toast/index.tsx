import {BaseToast, ErrorToast, ToastProps} from 'react-native-toast-message';

export const toastConfig = {
    success: (props: ToastProps) => <BaseToast {...props} style={{borderLeftWidth: 0}} />,
    error: (props: ToastProps) => <ErrorToast {...props} style={{borderLeftWidth: 0}} />,
};
