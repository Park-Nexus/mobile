import {trpc, TrpcInput} from '@src/trpc';

export type TCreateTicketPayload = TrpcInput['reservation']['ticket']['create'];
export function useCreateTicker() {
    const mutation = trpc.reservation.ticket.create.useMutation();

    const ctx = trpc.useUtils();
    const createTicket = (payload: TCreateTicketPayload) => {
        mutation.mutate(payload, {
            onSuccess() {
                ctx.reservation.ticket.get.many.invalidate();
            },
        });
    };

    return Object.assign({createTicket}, mutation);
}
