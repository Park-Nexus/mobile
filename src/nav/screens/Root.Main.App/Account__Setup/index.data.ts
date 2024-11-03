import {trpc, TrpcInput} from '@src/trpc';

export type TCreateProfilePayload = TrpcInput['user']['profile']['create'];

export function useSubmit() {
    const mutation = trpc.user.profile.create.useMutation();
}
