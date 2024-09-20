import React from 'react';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TrpcProvider} from '../trpc';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from 'react-native';
import {Test} from '../Test';
import {SplashScreen} from '../screens/Root/Splash';

export function Root() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ActionSheetProvider>
        <TrpcProvider>
          <KeyboardAvoidingView>
            <SplashScreen />
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
