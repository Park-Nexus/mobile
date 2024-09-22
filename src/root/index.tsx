import React from 'react';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TrpcProvider} from '@src/trpc';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Test} from '../Test';
import {SplashScreen} from '@src/nav/screens/Root';
import {RootNavigator} from '@src/nav';

export function Root() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ActionSheetProvider>
        <TrpcProvider>
          <KeyboardAvoidingView>
            <RootNavigator />
          </KeyboardAvoidingView>
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
