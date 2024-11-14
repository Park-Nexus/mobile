import React from "react";
import {NavigationProp, RouteProp, useNavigation} from "@react-navigation/native";
import {AppStackParamList} from "@src/nav/navigators/Root.Main.App";
import {useTicketDetail} from "./index.data";
import {SafeAreaView} from "@src/components/SafeAreaWrapper";
import {Header} from "@src/components/Header";
import QRCode from "react-native-qrcode-svg";
import {TabParamList} from "@src/nav/navigators/Root.Main.App.Tabs";
import {ScrollView} from "react-native-gesture-handler";
import {Linking, Platform, Text, View} from "react-native";
import dayjs from "dayjs";
import {Button} from "@src/components/Button";
import {EXPIRATION_TIME_IN_HOURS, OVERSTAYING_PENALTY_CHARGES_IN_USD} from "@parknexus/api/rules";

type ScreenProps = {
    navigation: NavigationProp<AppStackParamList, "Reservation__Ticket_Detail">;
    route: RouteProp<AppStackParamList, "Reservation__Ticket_Detail">;
};
export function Reservation__Ticket_Detail({route, navigation}: ScreenProps) {
    const tabNavigation = useNavigation<NavigationProp<TabParamList>>();
    const {ticket} = useTicketDetail(route.params.ticketId);

    const ticketCode = ticket?.code;

    const directionLink = Platform.select({
        ios: `maps://${ticket?.parkingSpot?.parkingLot?.latitude},${ticket?.parkingSpot?.parkingLot?.longitude}?q='${ticket?.parkingSpot?.parkingLot?.name}'`,
        android: `geo://${ticket?.parkingSpot?.parkingLot?.latitude},${ticket?.parkingSpot?.parkingLot?.longitude}?q='${ticket?.parkingSpot?.parkingLot?.name}'`,
    });

    return (
        <SafeAreaView>
            <Header title="Ticket" backButtonVisible onBackButtonPress={() => tabNavigation.navigate("Ticket")} />
            <ScrollView style={{padding: 16}}>
                <View style={{backgroundColor: "#128085", borderRadius: 12}}>
                    <View style={{padding: 16}}>
                        {ticket?.status === "PENDING" && (
                            <Text style={{color: "#FAFAFA", fontSize: 14, fontWeight: "500", textAlign: "center"}}>
                                The ticket will be expired at{" "}
                                <Text style={{fontWeight: "600"}}>
                                    {dayjs(ticket?.startTime)
                                        .add(EXPIRATION_TIME_IN_HOURS, "hour")
                                        .format("MMM DD  HH:mm")}
                                </Text>
                            </Text>
                        )}
                        {ticket?.status === "ON_GOING" && (
                            <Text style={{color: "#FAFAFA", fontSize: 14, fontWeight: "500", textAlign: "center"}}>
                                Please check out before{" "}
                                <Text style={{fontWeight: "600"}}>
                                    {dayjs(ticket?.endTime)
                                        .add(OVERSTAYING_PENALTY_CHARGES_IN_USD, "hour")
                                        .format("MMM DD  HH:mm")}
                                </Text>{" "}
                                to avoid additional charges
                            </Text>
                        )}
                        {ticket?.status === "EXPIRED" && (
                            <Text style={{color: "#FAFAFA", fontSize: 14, fontWeight: "500", textAlign: "center"}}>
                                Your ticket has been expired
                            </Text>
                        )}
                        <View style={{height: 10}} />
                        <View style={{alignItems: "center"}}>
                            <QRCode color="#FAFAFA" backgroundColor={"#128085"} size={180} value={ticketCode} />
                        </View>
                    </View>
                    <View
                        style={{
                            height: 24,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                backgroundColor: "#FAFAFA",
                                borderTopRightRadius: 12,
                                borderBottomRightRadius: 12,
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                borderColor: "#FAFAFA",
                                borderWidth: 1,
                                borderStyle: "dashed",
                            }}
                        />
                        <View
                            style={{
                                width: 24,
                                height: 24,
                                backgroundColor: "#FAFAFA",
                                borderTopLeftRadius: 12,
                                borderBottomLeftRadius: 12,
                            }}
                        />
                    </View>

                    <View style={{padding: 16, flexDirection: "row"}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: "#CCCBCB", fontSize: 12, fontWeight: "600"}}>Parking Lot</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: "#FAFAFA", fontSize: 14, fontWeight: "600"}}>
                                {ticket?.parkingSpot?.parkingLot?.name}
                            </Text>

                            <View style={{height: 8}} />

                            <Text style={{color: "#CCCBCB", fontSize: 12, fontWeight: "600"}}>Vehicle</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: "#FAFAFA", fontSize: 14, fontWeight: "600"}}>
                                {ticket?.vehicle?.brand} {ticket?.vehicle?.model}
                            </Text>

                            <View style={{height: 8}} />

                            <Text style={{color: "#CCCBCB", fontSize: 12, fontWeight: "600"}}>Start Time</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: "#FAFAFA", fontSize: 14, fontWeight: "600"}}>
                                {dayjs(ticket?.startTime).format("MMM DD  HH:mm")}
                            </Text>
                        </View>
                        <View style={{width: 8}} />
                        <View style={{flex: 1}}>
                            <Text style={{color: "#CCCBCB", fontSize: 12, fontWeight: "600"}}>Phone</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: "#FAFAFA", fontSize: 14, fontWeight: "600"}}>
                                {ticket?.parkingSpot?.parkingLot?.phone}
                            </Text>

                            <View style={{height: 8}} />

                            <Text style={{color: "#CCCBCB", fontSize: 12, fontWeight: "600"}}>Parking Spot</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: "#FAFAFA", fontSize: 14, fontWeight: "600"}}>
                                {ticket?.parkingSpot?.name}
                            </Text>

                            <View style={{height: 8}} />

                            <Text style={{color: "#CCCBCB", fontSize: 12, fontWeight: "600"}}>End Time</Text>
                            <View style={{height: 4}} />
                            <Text numberOfLines={1} style={{color: "#FAFAFA", fontSize: 14, fontWeight: "600"}}>
                                {dayjs(ticket?.endTime).format("MMM DD  HH:mm")}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{height: 14}} />
                <View style={{flexDirection: "row", gap: 8}}>
                    <Button
                        variant="gray"
                        text="Navigate"
                        style={{flex: 1}}
                        onPress={() => Linking.openURL(directionLink!)}
                    />
                    {ticket?.paymentRecord?.status === "AWAITING" && (
                        <Button
                            variant="pink"
                            text="Pay ticket"
                            style={{flex: 1}}
                            onPress={() =>
                                navigation.navigate("Reservation__Ticket_Payment", {ticketId: route.params.ticketId})
                            }
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
