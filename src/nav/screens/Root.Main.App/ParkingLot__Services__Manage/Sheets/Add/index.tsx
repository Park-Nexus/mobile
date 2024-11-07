import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {forwardRef, useRef} from 'react';
import {useServiceManagerContext} from '../../index.context';
import {TAddParkingLotServicePayload, useSubmit} from './index.submit';
import {Controller, useForm} from 'react-hook-form';
import {TextInput} from '@src/components/Input__Text';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {PARKING_LOT_SERVICE__TYPE_ALIAS} from '@parknexus/api/prisma/client';
import {Button} from '@src/components/Button';
import {InputMultipleSelect} from '@src/components/Input__MultipleSelect';

type TExportServiceSheetProps = {
    onClose: () => void;
};
export const AddServiceSheet = forwardRef<BottomSheet, TExportServiceSheetProps>(({onClose}, ref) => {
    const {lotId} = useServiceManagerContext();
    const {submit, isPending} = useSubmit();

    const {control, handleSubmit} = useForm<TAddParkingLotServicePayload>({
        values: {
            parkingLotId: lotId,
            name: '',
            type: 'TIRE_REPAIR',
            vehicleTypes: ['CAR'],
            description: '',
            price: 0,
            mediaUrls: [],
        },
    });

    return (
        <BottomSheet ref={ref} snapPoints={['80%']} index={-1} enablePanDownToClose>
            <BottomSheetView>
                <ScrollView>
                    <Controller
                        control={control}
                        name="name"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="Name" value={value} onChangeText={onChange} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="description"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="Description" value={value} onChangeText={onChange} multiline />
                        )}
                    />
                    <Controller
                        control={control}
                        name="price"
                        render={({field: {onChange, value}}) => (
                            <TextInput placeholder="Price" value={value.toString()} onChangeText={onChange} />
                        )}
                    />
                    <Controller
                        control={control}
                        name="type"
                        render={({field: {onChange, value}}) => (
                            <Picker selectedValue={value} onValueChange={onChange} mode="dialog">
                                {Object.values(PARKING_LOT_SERVICE__TYPE_ALIAS).map(type => (
                                    <Picker.Item key={type} label={type} value={type} />
                                ))}
                            </Picker>
                        )}
                    />
                    <Controller
                        control={control}
                        name="vehicleTypes"
                        render={({field: {onChange, value}}) => (
                            <InputMultipleSelect
                                options={[
                                    {label: 'Car', value: 'CAR'},
                                    {label: 'Motorcycle', value: 'MOTORCYCLE'},
                                    {label: 'Truck', value: 'TRUCK'},
                                ]}
                                selectedOptions={value}
                                onChange={onChange}
                            />
                        )}
                    />
                </ScrollView>
                <Button variant="green" text="Add" />
            </BottomSheetView>
        </BottomSheet>
    );
});
