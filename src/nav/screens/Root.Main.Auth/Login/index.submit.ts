import {AuthStorage} from '@src/auth/auth.utils';
import {useAuthStore} from '@src/states';
import {trpc, TrpcInput} from '@src/trpc';
import Toast from 'react-native-toast-message';

export type TLoginPayload = TrpcInput['auth']['login'];

export function useSubmit() {
    const {setIsAuthenticated} = useAuthStore();
    const submitMutation = trpc.auth.login.useMutation();

    const trpcUtils = trpc.useUtils();

    const submit = (payload: TLoginPayload) => {
        submitMutation.mutate(payload, {
            async onSuccess(data) {
                await AuthStorage.setAccessToken(data.accessToken);
                await AuthStorage.setRefreshToken(data.refreshToken);
                trpcUtils.user.profile.invalidate();
                setIsAuthenticated(true);
            },
            onError(err) {
                console.error(err.message);
                Toast.show({
                    type: 'error',
                    text1: err.message,
                });
            },
        });
    };

    return Object.assign(submitMutation, {submit});
}
