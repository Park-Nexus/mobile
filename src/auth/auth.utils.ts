import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AuthTypes} from './index.types';

export namespace PhoneAuth {
  export async function signIn(
    phone: string,
  ): Promise<FirebaseAuthTypes.ConfirmationResult> {
    return auth().signInWithPhoneNumber(phone);
  }

  export async function confirm(
    confirmation: FirebaseAuthTypes.ConfirmationResult,
    code: string,
  ): Promise<FirebaseAuthTypes.UserCredential | null> {
    return confirmation.confirm(code);
  }
}

export namespace AuthStorage {
  export const getAccessToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem(AuthTypes.ACCESS_TOKEN_STORAGE_KEY);
  };
  export const setAccessToken = async (accessToken: string) => {
    return AsyncStorage.setItem(
      AuthTypes.ACCESS_TOKEN_STORAGE_KEY,
      accessToken,
    );
  };

  export const getRefreshToken = async (): Promise<string | null> => {
    return AsyncStorage.getItem(AuthTypes.REFRESH_TOKEN_STORAGE_KEY);
  };
  export const setRefreshToken = async (refreshToken: string) => {
    return AsyncStorage.setItem(
      AuthTypes.REFRESH_TOKEN_STORAGE_KEY,
      refreshToken,
    );
  };
}
