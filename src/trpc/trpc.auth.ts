import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {TRPCLink} from '@trpc/react-query';
import {TrpcRouter} from '@parknexus/api';
import {observable} from '@trpc/server/observable';
import {ApiTypes, AuthTypes} from '../types';

export const headers = async () => {
  const accessToken = await AsyncStorage.getItem(
    AuthTypes.ACCESS_TOKEN_STORAGE_KEY,
  );
  if (!accessToken) return {};
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const getAccessToken = async (): Promise<string | null> => {
  const refreshToken = await AsyncStorage.getItem(
    AuthTypes.REFRESH_TOKEN_STORAGE_KEY,
  );
  if (!refreshToken) return null;
  const response = await axios.post(
    `${ApiTypes.API_HOST}/auth.getAccessToken`,
    {
      refreshToken,
    },
  );
  const accessToken = response?.data?.result?.data?.accessToken || null;

  return accessToken;
};

export const authLinkInterceptor: TRPCLink<TrpcRouter> = () => {
  return ({next, op}) => {
    return observable(observer => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        async error(err) {
          if (err?.data?.code === 'UNAUTHORIZED') {
            // Get new access token ------------------------
            const newAccessToken = await getAccessToken();
            if (!newAccessToken) return observer.error(err);

            // Store new access token ------------------------
            await AsyncStorage.setItem(
              AuthTypes.ACCESS_TOKEN_STORAGE_KEY,
              newAccessToken,
            );

            next(op).subscribe({
              next: observer.next,
              error: observer.error,
              complete: observer.complete,
            });
          } else {
            observer.error(err);
          }
        },
        complete() {
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
};
