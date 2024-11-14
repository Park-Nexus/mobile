import React from "react";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {Header} from "@src/components/Header";
import {SafeAreaView} from "@src/components/SafeAreaWrapper";
import {AppStackParamList} from "@src/nav/navigators/Root.Main.App";
import {RefreshControl, ScrollView, Text} from "react-native";
import {useMyTickets} from "./index.data";

export function Ticket() {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

    const {tickets, refetch, isFetching} = useMyTickets();

    return (
        <SafeAreaView>
            <Header title="My Tickets" />
            <ScrollView>
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
                {tickets.map(ticket => (
                    <Text
                        key={ticket.id}
                        onPress={() => navigation.navigate("Reservation__Ticket_Detail", {ticketId: ticket.id})}>
                        {ticket.id}
                    </Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
