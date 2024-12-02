import {NavigationProp, RouteProp} from "@react-navigation/native";
import {Button} from "@src/components/Button";
import {Header} from "@src/components/Header";
import {SafeAreaView} from "@src/components/SafeAreaWrapper";
import {AuthStackParamList} from "@src/nav/navigators/Root.Main.Auth";
import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-controller";
import {OtpInput} from "react-native-otp-entry";

type ScreenProps = {
    navigation: NavigationProp<AuthStackParamList, "Verification">;
    route: RouteProp<AuthStackParamList, "Verification">;
};

export function Verification({navigation, route}: ScreenProps) {
    const {onVerify} = route.params;

    const [codes, onChangeCodes] = useState<string>("");

    return (
        <SafeAreaView>
            <Header onBackButtonPress={navigation.goBack} backButtonVisible />
            <View style={{height: 52}} />
            <KeyboardAwareScrollView style={styles.wrapper}>
                <OtpInput numberOfDigits={6} onTextChange={onChangeCodes} />
            </KeyboardAwareScrollView>
            <Button variant="green" text="Verify" onPress={() => onVerify(codes)} style={styles.button} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#FFF",
        paddingHorizontal: 16,
    },
    button: {},
});
