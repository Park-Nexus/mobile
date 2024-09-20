import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TrpcProvider} from '@src/trpc';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Test} from '../Test';
import {SplashScreen} from '@src/screens/Root/Splash';

export function Root() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <ActionSheetProvider>
          <TrpcProvider>
            <KeyboardAvoidingView>
              <SplashScreen />
            </KeyboardAvoidingView>
          </TrpcProvider>
        </ActionSheetProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});
