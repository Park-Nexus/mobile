import {forwardRef} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {Controller, useForm} from 'react-hook-form';
import {TUpdateParkingLotPricePayload, useSubmitPrice} from './index.submit';
import {TextInput} from '@src/components/Input__Text';
import {usePriceManagerContext} from '../index.context';
import {Button} from '@src/components/Button';
import {Picker} from '@react-native-picker/picker';
import {VEHICLE__TYPE_ALIAS} from '@parknexus/api/prisma/client';

type TExportPriceSheetProps = {
    onClose: () => void;
};
export const AddPriceSheet = forwardRef<BottomSheetModal, TExportPriceSheetProps>(({onClose}, ref) => {
    const {lotId} = usePriceManagerContext();
    const {submitPrice} = useSubmitPrice();
    const {control, handleSubmit} = useForm<TUpdateParkingLotPricePayload>({
        values: {
            parkingLotId: lotId,
            price: 0,
            vehicleType: 'CAR',
        },
    });

    const onSubmit = (data: TUpdateParkingLotPricePayload) => {
        submitPrice({...data, price: Number(data.price)}, onClose);
    };

    return (
        <BottomSheetModal ref={ref} snapPoints={['50%']} enablePanDownToClose>
            <BottomSheetView>
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
                    name="price"
                    render={({field: {onChange, value}}) => (
                        <TextInput placeholder="Price" value={value.toString()} onChangeText={onChange} />
                    )}
                />
                <Button variant="green" text="Add" onPress={handleSubmit(onSubmit)} />
            </BottomSheetView>
        </BottomSheetModal>
    );
});
