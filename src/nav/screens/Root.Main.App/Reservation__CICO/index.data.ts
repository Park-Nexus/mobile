import {trpc} from "@src/trpc";

export function useCustomerTicketDetail(ticketCode: string) {
    const response = trpc.reservation.ticket.get.single.useQuery(
        {
            code: ticketCode,
        },
        {enabled: !!ticketCode},
    );
    const ticket = response.data;
    return Object.assign({ticket}, response);
}
