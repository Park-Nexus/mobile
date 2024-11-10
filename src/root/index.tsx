import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {TrpcProvider} from '@src/trpc';
import {Keyboard} from 'react-native';

import Toast from 'react-native-toast-message';
import {toastConfig} from '@src/utils/toast';

import {RootNavigator} from '@src/nav';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export function Root() {
    return (
        <>
            <GestureHandlerRootView style={{flex: 1}} onTouchStart={Keyboard.dismiss}>
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
            <Toast config={toastConfig} />
        </>
    );
}
