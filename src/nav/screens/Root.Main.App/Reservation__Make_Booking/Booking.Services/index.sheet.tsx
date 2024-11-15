import React from "react";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {TServiceItem, useServiceDetail} from "./index.data";
import {ScrollView, Text} from "react-native";
import {Button} from "@src/components/Button";
import {useMakeBookingContext} from "../index.context";

export type TServiceDetailSheetRef = {
    show: (serviceId: number) => void;
};
export const ServiceDetailSheet = forwardRef<TServiceDetailSheetRef>(({}, ref) => {
    const [serviceId, setServiceId] = useState<number>();
    const {services, setServices} = useMakeBookingContext();
    const {service} = useServiceDetail(serviceId);

    const sheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
        show: (serviceId: number) => {
            setServiceId(serviceId);
            sheetRef.current?.present();
        },
    }));

    const isSelected = services.some((service: TServiceItem) => service.id === serviceId);
    const toggleSelect = () => {
        if (!serviceId) return;
        if (isSelected) {
            setServices(services.filter((service: TServiceItem) => service.id !== serviceId));
        } else {
            setServices([...services, service!]);
        }
        sheetRef.current?.dismiss();
    };

    return (
        <BottomSheetModal ref={sheetRef} snapPoints={["60%"]}>
            <BottomSheetView>
                <ScrollView>
                    <Text>{service?.name}</Text>
                </ScrollView>
                <Button variant="green" text={isSelected ? "Remove" : "Add"} onPress={toggleSelect} />
            </BottomSheetView>
        </BottomSheetModal>
    );
});
