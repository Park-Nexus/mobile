import {trpc, TrpcInput} from '@src/trpc';

export type TCreateParkingLotPayload = TrpcInput['parking']['lot']['submit'];

export function useSubmit() {
    const mutation = trpc.parking.lot.submit.useMutation();

    const ctx = trpc.useUtils();
    const submit = (payload: TCreateParkingLotPayload) => {
        mutation.mutate(payload, {
            onSuccess() {
                ctx.parking.lot.get.many.invalidate();
            },
        });
    };

    return Object.assign({submit}, mutation);
}
