import React from "react";
import _ from "lodash";
import {NavigationProp, RouteProp} from "@react-navigation/native";
import {Header} from "@src/components/Header";
import {SafeAreaView} from "@src/components/SafeAreaWrapper";
import {AppStackParamList} from "@src/nav/navigators/Root.Main.App";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useCustomerTicketDetail} from "./index.data";
import Toast from "react-native-toast-message";
import {Button} from "@src/components/Button";
import dayjs from "dayjs";
import FastImage from "react-native-fast-image";
import {parseEnum} from "@src/utils/text";

type ScreenParams = {
    navigation: NavigationProp<AppStackParamList>;
    route: RouteProp<AppStackParamList, "Reservation__CICO">;
};
export function Reservation__CICO({route, navigation}: ScreenParams) {
    const ticketCode = route.params.ticketCode;
    const {ticket, isError} = useCustomerTicketDetail(ticketCode);

    const isAwaitingPayment = ticket?.paymentRecord?.status === "AWAITING";
    const isPending = ticket?.status === "PENDING";
    const isOngoing = ticket?.status === "ON_GOING";
    const isExpired = ticket?.status === "EXPIRED";
    const isOverstayed = ticket?.status === "OVERSTAYED";
    const isCancelled = ticket?.status === "CANCELLED";

    const onCheckIn = () => {};
    const onCheckOut = () => {};

    const renderTicketInfo = () => {
        if (!ticket) return null;

        return (
            <View style={styles.ticketContainer}>
                {/* Ticket Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ticket Details</Text>
                    <Text style={styles.text}>
                        Status:{" "}
                        <Text style={{color: isPending ? "#128085" : "#B33E00"}}>{parseEnum(ticket.status)}</Text>
                    </Text>
                    <Text style={styles.text}>
                        Time: {dayjs(ticket.startTime).format("HH:mm MMM DD")} -{" "}
                        {dayjs(ticket.endTime).format("HH:mm MMM DD")}
                    </Text>
                </View>

                {/* Parking Spot Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Parking Spot</Text>
                    <Text style={styles.text}>Name: {ticket.parkingSpot.name}</Text>
                    <Text style={styles.text}>Lot: {ticket.parkingSpot.parkingLot.name}</Text>
                    <Text style={styles.text}>Type: {parseEnum(ticket.parkingSpot.vehicleType)}</Text>
                </View>

                {/* Vehicle Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Vehicle Info</Text>
                    {ticket.vehicle.imageUrl && (
                        <FastImage source={{uri: ticket.vehicle.imageUrl}} style={styles.vehicleImage} fallback />
                    )}
                    <Text style={styles.text}>
                        {parseEnum(ticket.vehicle.type)}: {ticket.vehicle.color} {ticket.vehicle.brand}{" "}
                        {ticket.vehicle.model}
                    </Text>
                    <Text style={styles.text}>Plate: {ticket.vehicle.plate}</Text>
                </View>

                {/* Services */}
                {ticket.services && ticket.services.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Services</Text>
                        {ticket.services.map(service => (
                            <Text key={service.id} style={styles.text}>
                                {service.name} - ${service.price}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Payment Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Info</Text>
                    <Text style={styles.text}>Amount: ${ticket.paymentRecord?.amountInUsd}</Text>
                    <Text style={styles.text}>
                        Status:{" "}
                        <Text style={{color: isAwaitingPayment ? "#B33E00" : "#128085"}}>
                            {parseEnum(ticket.paymentRecord?.status)}
                        </Text>
                    </Text>
                </View>
            </View>
        );
    };

    if (isError) {
        Toast.show({
            type: "error",
            text1: "Invalid QR Code",
        });
        navigation.goBack();
        return null;
    }
    return (
        <SafeAreaView>
            <Header title="Check In/Check Out" />
            <ScrollView style={styles.wrapper}>{renderTicketInfo()}</ScrollView>
            {isPending && (
                <Button
                    variant="gray"
                    text="Check In"
                    onPress={onCheckIn}
                    style={styles.button}
                    disabled={isAwaitingPayment}
                />
            )}
            {isOngoing && <Button variant="pink" text="Check Out" onPress={onCheckOut} style={styles.button} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 16,
    },
    ticketContainer: {
        marginVertical: 16,
    },
    section: {
        marginBottom: 16,
        backgroundColor: "#f7f7f7",
        padding: 16,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#3c3c3c",
        marginBottom: 8,
    },
    vehicleImage: {
        width: "100%",
        aspectRatio: 16 / 9,
        borderRadius: 8,
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 4,
        color: "#3c3c3c",
        fontWeight: "500",
    },
    button: {
        margin: 16,
    },
});
