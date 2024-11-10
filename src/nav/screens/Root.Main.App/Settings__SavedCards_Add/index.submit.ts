import {trpc, TrpcInput} from '@src/trpc';

type TAddCardPayload = TrpcInput['payment']['method']['add'];
export function useSubmit() {
    const mutation = trpc.payment.method.add.useMutation();

    const ctx = trpc.useUtils();
    const addCard = (payload: TAddCardPayload) => {
        mutation.mutate(payload, {
            onSuccess() {
                ctx.payment.method.get.many.invalidate();
            },
        });
    };

    return Object.assign({addCard}, mutation);
}
