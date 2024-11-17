import {Header} from "@src/components/Header";
import {SafeAreaView} from "@src/components/SafeAreaWrapper";
import React from "react";
import {useStripeConnectUrl} from "./index.data";
import {ScrollView} from "react-native-gesture-handler";
import {Button} from "@src/components/Button";
import {Linking} from "react-native";

export function Settings__Payout() {
    const {url} = useStripeConnectUrl();

    return (
        <SafeAreaView>
            <Header title="Payout" />
            <Button
                variant="gray"
                text="Open Stripe Connect"
                onPress={() => {
                    if (url) Linking.openURL(url);
                }}
            />
            <ScrollView></ScrollView>
        </SafeAreaView>
    );
}
