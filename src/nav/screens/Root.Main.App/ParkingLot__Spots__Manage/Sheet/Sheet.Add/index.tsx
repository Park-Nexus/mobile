import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {forwardRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Text} from 'react-native';
import {TAddParkingLotSpotPayload, useSubmit} from './index.submit';
import {useSpotManagerContext} from '../../index.context';
import {VEHICLE__TYPE_ALIAS} from '@parknexus/api/prisma/client';
import {TextInput} from '@src/components/Input__Text';
import {Picker} from '@react-native-picker/picker';
import {Button} from '@src/components/Button';

type TExportParkingSpotSheetProps = {
    onClose: () => void;
};
export const AddParkingSpotSheet = forwardRef<BottomSheetModal, TExportParkingSpotSheetProps>(({onClose}, ref) => {
    const {lotId} = useSpotManagerContext();

    const {submit, isPending} = useSubmit();

    const {control, handleSubmit} = useForm<TAddParkingLotSpotPayload>({
        values: {
            parkingLotId: lotId,
            name: '',
            vehicleType: VEHICLE__TYPE_ALIAS.CAR,
        },
    });

    const onSubmit = (data: TAddParkingLotSpotPayload) => {
        submit(data, onClose);
    };

    return (
        <BottomSheetModal ref={ref} snapPoints={['50%']}>
            <BottomSheetView>
                <Text>Add Parking Spot</Text>

                <Controller
                    control={control}
                    name="vehicleType"
                    render={({field: {onChange, value}}) => (
                        <Picker selectedValue={value} onValueChange={onChange} mode="dialog">
                            <Picker.Item label="Car" value={VEHICLE__TYPE_ALIAS.CAR} />
                            <Picker.Item label="Motorcycle" value={VEHICLE__TYPE_ALIAS.MOTORCYCLE} />
                            <Picker.Item label="Truck" value={VEHICLE__TYPE_ALIAS.TRUCK} />
                        </Picker>
                    )}
                />

                <Controller
                    control={control}
                    name="name"
                    render={({field: {onChange, value}}) => (
                        <TextInput placeholder="Name" value={value} onChangeText={onChange} />
                    )}
                />

                <Button text="Add" variant="green" onPress={handleSubmit(onSubmit)} disabled={isPending} />
            </BottomSheetView>
        </BottomSheetModal>
    );
});
