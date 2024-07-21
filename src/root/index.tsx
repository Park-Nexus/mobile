import React from 'react';

import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TrpcProvider} from '../trpc';
import {KeyboardAvoidingView, SafeAreaView, StyleSheet} from 'react-native';
import {Test} from '../Test';

export function Root() {
  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <ActionSheetProvider>
        <TrpcProvider>
          <SafeAreaView>
            <KeyboardAvoidingView>
              <Test />
            </KeyboardAvoidingView>
          </SafeAreaView>
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
