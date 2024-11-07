import {trpc, TrpcInput} from '@src/trpc';

export type TUpdateParkingLotPricePayload = TrpcInput['parking']['lot']['price']['update'];
export function useSubmitPrice() {
    const mutation = trpc.parking.lot.price.update.useMutation();

    const ctx = trpc.useUtils();
    const submitPrice = (payload: TUpdateParkingLotPricePayload, onSuccess?: () => void) => {
        mutation.mutate(payload, {
            async onSuccess() {
                await ctx.parking.lot.get.single.invalidate();
                onSuccess?.();
            },
        });
    };

    return Object.assign({submitPrice}, mutation);
}
