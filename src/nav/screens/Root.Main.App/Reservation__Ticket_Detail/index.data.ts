import {trpc} from '@src/trpc';

export const useTicketDetail = (ticketId: number) => {
    const response = trpc.reservation.ticket.get.single.useQuery({
        id: ticketId,
    });

    const ticket = response.data;

    return Object.assign({ticket}, response);
};
