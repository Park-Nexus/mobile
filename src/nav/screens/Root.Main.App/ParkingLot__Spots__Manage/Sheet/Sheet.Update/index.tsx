import React from "react";
import {BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {forwardRef} from "react";
import {useSpotManagerContext} from "../../index.context";
import {TUpdateParkingLotSpotPayload, useSubmit} from "./index.submit";
import {Controller, useForm} from "react-hook-form";
import {StyleSheet, Text, View} from "react-native";
import {TextInput} from "@src/components/Input__Text";
import {Button} from "@src/components/Button";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";

type TExportParkingSpotSheetProps = {
    onClose: () => void;
};
export const UpdateParkingSpotSheet = forwardRef<BottomSheetModal, TExportParkingSpotSheetProps>(({onClose}, ref) => {
    const {selectedSpot, setSelectedSpot} = useSpotManagerContext();
    const {submit, isPending} = useSubmit();

    const {control, handleSubmit} = useForm<TUpdateParkingLotSpotPayload>({
        values: {
            spotId: selectedSpot!.id,
            name: selectedSpot!.name,
        },
    });

    const onSubmit = (data: TUpdateParkingLotSpotPayload) => {
        submit(data, () => {
            onClose();
            setSelectedSpot(undefined);
        });
    };

    return (
        <BottomSheetModal ref={ref} snapPoints={["40%"]} backgroundStyle={{backgroundColor: "#f8f8f8"}}>
            <BottomSheetView style={styles.container}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>Update Parking Spot</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Spot Name</Text>
                        <Controller
                            control={control}
                            name="name"
                            render={({field: {onChange, value}}) => (
                                <TextInput placeholder="Enter spot name" value={value} onChangeText={onChange} />
                            )}
                        />
                    </View>

                    <Button
                        text="Update"
                        variant="green"
                        onPress={handleSubmit(onSubmit)}
                        disabled={isPending}
                        style={styles.button}
                    />
                </KeyboardAwareScrollView>
            </BottomSheetView>
        </BottomSheetModal>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333",
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#555",
        marginBottom: 8,
    },
    button: {
        marginBottom: 16,
    },
});
