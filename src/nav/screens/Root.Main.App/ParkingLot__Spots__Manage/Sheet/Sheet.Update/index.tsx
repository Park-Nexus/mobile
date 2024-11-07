import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {forwardRef} from 'react';
import {useSpotManagerContext} from '../../index.context';
import {TUpdateParkingLotSpotPayload, useSubmit} from './index.submit';
import {Controller, useForm} from 'react-hook-form';
import {Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {VEHICLE__TYPE_ALIAS} from '@parknexus/api/prisma/client';
import {TextInput} from '@src/components/Input__Text';
import {Button} from '@src/components/Button';

type TExportParkingSpotSheetProps = {
    onClose: () => void;
};
export const UpdateParkingSpotSheet = forwardRef<BottomSheetModal, TExportParkingSpotSheetProps>(({onClose}, ref) => {
    const {lotId, selectedSpot} = useSpotManagerContext();

    const {submit, isPending} = useSubmit();

    const {control, handleSubmit} = useForm<TUpdateParkingLotSpotPayload>({
        values: {
            spotId: selectedSpot!.id,
        },
    });

    const onSubmit = (data: TUpdateParkingLotSpotPayload) => {
        submit(data, onClose);
    };

    return (
        <BottomSheetModal ref={ref} snapPoints={['50%']}>
            <BottomSheetView>
                <Text>Update Parking Spot</Text>
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

                <Button text="Update" variant="green" onPress={handleSubmit(onSubmit)} disabled={isPending} />
            </BottomSheetView>
        </BottomSheetModal>
    );
});
