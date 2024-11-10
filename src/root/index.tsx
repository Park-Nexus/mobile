import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {TrpcProvider} from '@src/trpc';
import {Button, InputAccessoryView, Keyboard, KeyboardAvoidingView, Platform, Pressable, View} from 'react-native';

import Toast from 'react-native-toast-message';
import {toastConfig} from '@src/utils/toast';

import {RootNavigator} from '@src/nav';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export function Root() {
    return (
        <>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
                <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
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
                </Pressable>
            </KeyboardAvoidingView>
            <Toast config={toastConfig} />
        </>
    );
}
