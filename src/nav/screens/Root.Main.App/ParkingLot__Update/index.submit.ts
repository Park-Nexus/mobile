import {trpc, TrpcInput} from '@src/trpc';

export type TUpdateParkingLotPayload = TrpcInput['parking']['lot']['update'];
export function useSubmit() {
    const mutation = trpc.parking.lot.update.useMutation();

    const ctx = trpc.useUtils();
    const submit = (payload: TUpdateParkingLotPayload, onSuccess?: () => void) => {
        mutation.mutate(payload, {
            onSuccess() {
                ctx.parking.lot.get.single.invalidate();
                onSuccess?.();
            },
        });
    };

    return Object.assign(mutation, {submit});
}
