import {trpc, TrpcInput} from '@src/trpc';

export type TUpdateParkingLotSpotPayload = TrpcInput['parking']['lot']['spot']['update'];
export function useSubmit() {
    const mutation = trpc.parking.lot.spot.update.useMutation();

    const ctx = trpc.useUtils();
    const submit = (payload: TUpdateParkingLotSpotPayload, onSuccess?: () => void) => {
        mutation.mutate(payload, {
            async onSuccess() {
                await ctx.parking.lot.get.single.invalidate();
                onSuccess?.();
            },
        });
    };

    return Object.assign({submit}, mutation);
}
