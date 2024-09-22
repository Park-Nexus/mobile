import React from 'react';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TrpcProvider} from '@src/trpc';
import {StyleSheet} from 'react-native';
import {RootNavigator} from '@src/nav';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export function Root() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ActionSheetProvider>
        <TrpcProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </TrpcProvider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
