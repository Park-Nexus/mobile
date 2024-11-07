import {Header} from '@src/components/Header';
import {SafeAreaView} from '@src/components/SafeAreaWrapper';
import {useServiceManagerContext} from '../index.context';
import {useMyParkingLotDetail} from './index.data';
import {Text} from 'react-native';

export function List() {
    const {lotId} = useServiceManagerContext();
    const {lot} = useMyParkingLotDetail(lotId);

    return (
        <SafeAreaView>
            <Header title="Services" />
            {lot?.parkingLotServices.map((service, index) => (
                <Text key={index}>
                    {service.name} - {service.price} - {service.type} - {service.description}
                </Text>
            ))}
        </SafeAreaView>
    );
}
