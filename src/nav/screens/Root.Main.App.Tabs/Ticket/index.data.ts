import {trpc} from '@src/trpc';

export function useMyTickets() {
    const response = trpc.reservation.ticket.get.many.useQuery({
        isMine: true,
    });

    const tickets = response?.data || [];

    return Object.assign({tickets}, response);
}
