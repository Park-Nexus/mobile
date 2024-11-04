import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {TrpcProvider} from '@src/trpc';
import {StyleSheet} from 'react-native';

import Toast from 'react-native-toast-message';
import {toastConfig} from '@src/utils/toast';

import {RootNavigator} from '@src/nav';

export function Root() {
    return (
        <>
            <GestureHandlerRootView style={styles.gestureHandlerRootView}>
                <ActionSheetProvider>
                    <TrpcProvider>
                        <SafeAreaProvider>
                            <RootNavigator />
                        </SafeAreaProvider>
                    </TrpcProvider>
                </ActionSheetProvider>
            </GestureHandlerRootView>
            <Toast config={toastConfig} />
        </>
    );
}

const styles = StyleSheet.create({
    gestureHandlerRootView: {
        flex: 1,
    },
});
