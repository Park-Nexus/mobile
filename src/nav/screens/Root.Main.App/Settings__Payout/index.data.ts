import {trpc} from "@src/trpc";

export function useStripeConnectUrl() {
    const response = trpc.payment.payout.stripeConnectUrl.get.useQuery();
    const url = response.data?.url;
    return Object.assign({url}, response);
}
