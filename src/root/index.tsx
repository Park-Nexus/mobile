import React from "react";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

import {TrpcProvider} from "@src/trpc";

import Toast from "react-native-toast-message";
import {toastConfig} from "@src/utils/toast";

import {RootNavigator} from "@src/nav";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";

import {KeyboardProvider} from "react-native-keyboard-controller";

import "@azure/core-asynciterator-polyfill";
import {RNEventSource} from "rn-eventsource-reborn";
import {ReadableStream, TransformStream} from "web-streams-polyfill";

globalThis.ReadableStream = globalThis.ReadableStream || ReadableStream;
globalThis.TransformStream = globalThis.TransformStream || TransformStream;
globalThis.EventSource = globalThis.EventSource || RNEventSource;

export function Root() {
    return (
        <>
            <KeyboardProvider>
                <GestureHandlerRootView style={{flex: 1}}>
                    <ActionSheetProvider>
                        <TrpcProvider>
                            <BottomSheetModalProvider>
                                <SafeAreaProvider>
                                    <RootNavigator />
                                </SafeAreaProvider>
                            </BottomSheetModalProvider>
                        </TrpcProvider>
                    </ActionSheetProvider>
                </GestureHandlerRootView>
            </KeyboardProvider>
            <Toast config={toastConfig} />
        </>
    );
}
