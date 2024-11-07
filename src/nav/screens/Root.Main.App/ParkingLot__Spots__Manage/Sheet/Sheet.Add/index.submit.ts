import {trpc, TrpcInput} from '@src/trpc';

export type TAddParkingLotSpotPayload = TrpcInput['parking']['lot']['spot']['add'];
export function useSubmit() {
    const mutation = trpc.parking.lot.spot.add.useMutation();

    const ctx = trpc.useUtils();
    const submit = (data: TAddParkingLotSpotPayload, onSuccess?: () => void) => {
        mutation.mutateAsync(data, {
            async onSuccess() {
                await ctx.parking.lot.get.single.invalidate();
                onSuccess?.();
            },
        });
    };

    return Object.assign({submit}, mutation);
}
