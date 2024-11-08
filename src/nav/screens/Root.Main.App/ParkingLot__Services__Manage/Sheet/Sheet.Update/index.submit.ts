import {trpc, TrpcInput} from '@src/trpc';

export type TUpdateParkingLotServicePayload = TrpcInput['parking']['lot']['service']['update'];
export function useSubmit() {
    const mutation = trpc.parking.lot.service.update.useMutation();

    const ctx = trpc.useUtils();
    const submit = (payload: TUpdateParkingLotServicePayload, onSuccess?: () => void) => {
        mutation.mutate(payload, {
            async onSuccess() {
                await ctx.parking.lot.get.single.invalidate();
                await ctx.parking.lot.service.get.single.invalidate();
                onSuccess?.();
            },
        });
    };

    return Object.assign({submit}, mutation);
}