import React from "react";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {Header} from "@src/components/Header";
import {SafeAreaView} from "@src/components/SafeAreaWrapper";
import {AppStackParamList} from "@src/nav/navigators/Root.Main.App";
import {RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import {useMyTickets} from "./index.data";
import {Button} from "@src/components/Button";

import CalendarRemoveSvg from "@src/static/svgs/CalendarRemove.svg";
import CalendarSmallSvg from "@src/static/svgs/CalendarSmall.svg";
import CalendarSuccessSvg from "@src/static/svgs/CalendarSuccess.svg";
import CalendarTimeSvg from "@src/static/svgs/CalendarTime.svg";
import dayjs from "dayjs";
import {RESERVATION__STATUS_ALIAS} from "@parknexus/api/prisma/client";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export function Ticket() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const {bottom} = useSafeAreaInsets();
    const {tickets, refetch, isFetching} = useMyTickets();

    const getStatusStyle = (status: RESERVATION__STATUS_ALIAS) => {
        switch (status) {
            case "PENDING":
                return styles.statusPending;
            case "ON_GOING":
                return styles.statusOngoing;
            case "COMPLETED":
                return styles.statusFinished;
            case "EXPIRED":
                return styles.statusExpired;
            default:
                return styles.statusDefault;
        }
    };

    /* tickets sample data
      [
  {
    "id": 1,
    "code": "920add00-4c33-453f-b9ab-f3d6c6fb4390",
    "status": "EXPIRED",
    "startTime": "2024-11-11T20:01:46.888Z",
    "endTime": "2024-11-12T00:01:46.888Z",
    "createdAt": "2024-11-11T19:46:58.342Z",
    "updatedAt": "2024-11-11T21:01:46.098Z",
    "userId": 4,
    "parkingSpotId": 1,
    "vehicleId": 2
  },
  {
    "id": 2,
    "code": "bd754a24-90d4-4ebf-a4da-02c539e1cda7",
    "status": "PENDING",
    "startTime": "2024-11-13T11:50:08.801Z",
    "endTime": "2024-11-14T15:50:24.000Z",
    "createdAt": "2024-11-13T11:36:42.301Z",
    "updatedAt": "2024-11-13T11:36:42.301Z",
    "userId": 4,
    "parkingSpotId": 1,
    "vehicleId": 2
  }]
     */

    return (
        <SafeAreaView>
            <Header title="My Tickets" />
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filter}>
                    <Button
                        style={styles.filterButton}
                        textProps={{style: styles.filterButtonText}}
                        variant="green"
                        preIcon={<CalendarSmallSvg width={18} height={18} />}
                        text="Up Coming"
                    />
                    <Button
                        style={styles.filterButton}
                        textProps={{style: styles.filterButtonText}}
                        variant="green"
                        preIcon={<CalendarTimeSvg width={18} height={18} />}
                        text="On Going"
                    />
                    <Button
                        style={styles.filterButton}
                        textProps={{style: styles.filterButtonText}}
                        variant="green"
                        preIcon={<CalendarSuccessSvg width={18} height={18} />}
                        text="Finished"
                    />
                    <Button
                        style={styles.filterButton}
                        textProps={{style: styles.filterButtonText}}
                        variant="green"
                        preIcon={<CalendarRemoveSvg width={18} height={18} />}
                        text="Canceled"
                    />
                </ScrollView>
            </View>
            <ScrollView style={[styles.wrapper]}>
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                <View style={{height: 4}} />
                {tickets.map(ticket => (
                    <View key={ticket.id} style={styles.ticketCard}>
                        <View style={styles.statusTag}>
                            <Text style={[styles.statusText, getStatusStyle(ticket.status)]}>{ticket.status}</Text>
                        </View>
                        <Text style={styles.ticketCode}>Parking Lot: </Text>
                        <Text style={styles.ticketDate}>
                            {dayjs(ticket.startTime).format("MMM DD, HH:mm")} -{" "}
                            {dayjs(ticket.endTime).format("MMM DD, HH:mm")}
                        </Text>
                        <Button
                            text="View Details"
                            variant="gray"
                            style={styles.ticketButton}
                            onPress={() => navigation.navigate("Reservation__Ticket_Detail", {ticketId: ticket.id})}
                        />
                    </View>
                ))}
                <View style={{height: bottom + 50}} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    filter: {
        paddingHorizontal: 8,
        marginVertical: 12,
        gap: 4,
    },
    filterButton: {
        height: 32,
    },
    filterButtonText: {
        fontSize: 14,
    },
    wrapper: {
        paddingHorizontal: 16,
        flex: 1,
    },
    ticketCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, // Android shadow
        position: "relative",
    },
    statusTag: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#f7f7f7",
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    statusPending: {
        color: "#FFA500",
    },
    statusOngoing: {
        color: "#007BFF",
    },
    statusFinished: {
        color: "#28A745",
    },
    statusExpired: {
        color: "#DC3545",
    },
    statusDefault: {
        color: "#6C757D",
    },
    ticketCode: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333333",
    },
    ticketDate: {
        fontSize: 14,
        marginBottom: 4,
        color: "#555555",
    },
    ticketButton: {
        marginTop: 12,
    },
});
