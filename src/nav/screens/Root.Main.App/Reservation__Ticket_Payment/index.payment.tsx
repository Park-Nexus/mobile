import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {useStripeIntent} from './index.data';
import {useState} from 'react';
import {View} from 'react-native';
import {Button} from '@src/components/Button';
type ScreenProps = {
    ticketId: number;
};
export function Payment({ticketId}: ScreenProps) {
    const {confirmPayment, loading} = useConfirmPayment();
    const {stripeClientSecret} = useStripeIntent(ticketId);

    console.log('stripeClientSecret', stripeClientSecret);

    const onConfirmPayment = async () => {
        if (!stripeClientSecret) return;
        const {error, paymentIntent} = await confirmPayment(stripeClientSecret, {
            paymentMethodType: 'Card',
        });

        console.log('paymentIntent', paymentIntent);

        if (error) {
            console.log('error', error);
        }
    };

    return (
        <View>
            <CardField
                postalCodeEnabled={false}
                placeholders={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
            />
            <Button variant="pink" text="Pay" onPress={onConfirmPayment} />
        </View>
    );
}
