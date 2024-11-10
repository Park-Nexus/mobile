import {trpc, TrpcInput} from '@src/trpc';

export function useStripePublishableKey() {
    const response = trpc.payment.key.stripePublishable.get.useQuery();
    const stripePublishableKey = response.data?.stripePublishableKey || '';
    return Object.assign({stripePublishableKey}, response);
}

export function useStripeIntent(ticketId: number) {
    const response = trpc.payment.reservation.stripeIntent.get.useQuery({
        ticketId,
    });
    const stripeClientSecret = response.data?.clientSecret;
    return Object.assign({stripeClientSecret}, response);
}

export function usePaymentMethods() {
    const response = trpc.payment.method.get.many.useQuery();
    const paymentMethods = response?.data || [];
    return Object.assign({paymentMethods}, response);
}
