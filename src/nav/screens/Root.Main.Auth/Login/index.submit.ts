import AsyncStorage from '@react-native-async-storage/async-storage';
import {trpc, TrpcInput} from '@src/trpc';
import {AuthTypes} from '@src/types';

export type TLoginPayload = TrpcInput['auth']['login'];

export function useSubmit() {
  const submitMutation = trpc.auth.login.useMutation();

  const trpcUtils = trpc.useUtils();

  const submit = (payload: TLoginPayload) => {
    submitMutation.mutate(payload, {
      async onSuccess(data) {
        await AsyncStorage.setItem(
          AuthTypes.ACCESS_TOKEN_STORAGE_KEY,
          data.accessToken,
        );
        await AsyncStorage.setItem(
          AuthTypes.REFRESH_TOKEN_STORAGE_KEY,
          data.refreshToken,
        );
        trpcUtils.user.profile.invalidate();
      },
      onError(err) {
        console.error(err.message);
      },
    });
  };

  return Object.assign(submitMutation, {submit});
}
