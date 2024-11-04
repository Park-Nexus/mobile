import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '@src/nav/navigators/Root.Main.Auth';
import {trpc, TrpcInput} from '@src/trpc';
import {parseTrpcErrorMessage} from '@src/utils/trpcHelpers';
import Toast from 'react-native-toast-message';

export type TRegisterPayload = TrpcInput['auth']['register'];
export function useSubmit() {
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    const mutation = trpc.auth.register.useMutation();

    const submit = (payload: TRegisterPayload) => {
        mutation.mutate(payload, {
            onSuccess() {
                navigation.navigate('Login');
            },
            onError(err) {
                console.error(err.message);
                Toast.show({
                    type: 'error',
                    text1: parseTrpcErrorMessage(err.message),
                });
            },
        });
    };

    return Object.assign(mutation, {submit});
}
