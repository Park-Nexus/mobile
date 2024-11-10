import {View} from 'react-native';
import {useSubmit} from './index.submit';
import {createPaymentMethod, CardField} from '@stripe/stripe-react-native';
import {Button} from '@src/components/Button';

export function Content() {
    const {addCard} = useSubmit();

    const handleAddCard = async () => {
        const {paymentMethod, error} = await createPaymentMethod({
            paymentMethodType: 'Card',
        });
        if (paymentMethod) addCard({stripeMethodId: paymentMethod.id});
        if (error) console.log(error);
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
            <Button variant="green" text="Add card" onPress={handleAddCard} />
        </View>
    );
}
