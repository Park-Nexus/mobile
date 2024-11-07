import {forwardRef} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Controller, useForm} from 'react-hook-form';
import {TUpdateParkingLotPricePayload, useSubmitPrice} from './index.submit';
import {TextInput} from '@src/components/Input__Text';
import {usePriceManagerContext} from '../index.context';
import {Button} from '@src/components/Button';

type TExportPriceSheetProps = {
    onClose: () => void;
};
export const AddPriceSheet = forwardRef<BottomSheet, TExportPriceSheetProps>(({onClose}, ref) => {
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
        <BottomSheet ref={ref} snapPoints={['50%']} index={-1} enablePanDownToClose>
            <BottomSheetView>
                <Controller
                    control={control}
                    name="price"
                    render={({field: {onChange, value}}) => (
                        <TextInput value={value.toString()} onChangeText={onChange} />
                    )}
                />
                <Button variant="green" text="Add" onPress={handleSubmit(onSubmit)} />
            </BottomSheetView>
        </BottomSheet>
    );
});
