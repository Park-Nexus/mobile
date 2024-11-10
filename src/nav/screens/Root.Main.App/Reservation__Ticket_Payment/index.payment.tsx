import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import {usePaymentMethods, useStripeIntent} from './index.data';
import {useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {Button} from '@src/components/Button';
import {useVerifyPayment} from './index.submit';
import {InputRadioButton} from '@src/components/Input__RadioButton';
type ScreenProps = {
    ticketId: number;
};
export function Payment({ticketId}: ScreenProps) {
    const {confirmPayment, loading} = useConfirmPayment();
    const {stripeClientSecret} = useStripeIntent(ticketId);
    const {paymentMethods} = usePaymentMethods();
    const {verifyPayment} = useVerifyPayment();

    const [paymentMethodId, setPaymentMethodId] = useState<string>();

    const onConfirmPayment = async () => {
        if (!stripeClientSecret || !paymentMethodId) return;
        const {error, paymentIntent} = await confirmPayment(stripeClientSecret, {
            paymentMethodType: 'Card',
            paymentMethodData: {
                paymentMethodId: paymentMethodId,
            },
        });
        if (paymentIntent) verifyPayment({ticketId, intentId: paymentIntent.id});
        if (error) console.log('error', error);
    };

    return (
        <View>
            <ScrollView>
                {paymentMethods.map(method => (
                    <Pressable key={method.id} onPress={() => setPaymentMethodId(method.id)}>
                        <Text>
                            {method.card?.brand} - **** **** **** {method.card?.last4}
                        </Text>
                        <InputRadioButton isSelected={method.id === paymentMethodId} />
                    </Pressable>
                ))}
            </ScrollView>
            <Button variant="gray" text="Cancel" onPress={() => {}} />
            <Button variant="pink" text="Pay" onPress={onConfirmPayment} />
        </View>
    );
}
