import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {tempHost} from './trpc.types';

import {TRPCLink} from '@trpc/react-query';
import {TrpcRouter} from '@parknexus/api';
import {observable} from '@trpc/server/observable';

export const headers = async () => {
  const accessToken = await AsyncStorage.getItem('at');
  if (!accessToken) return {};
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};

export const refreshToken = async (): Promise<string | null> => {
  const refreshToken = await AsyncStorage.getItem('rt');
  if (!refreshToken) return null;
  const response = await axios.post(`${tempHost}/auth.getAccessToken`, {
    refreshToken,
  });
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
            const newAccessToken = await refreshToken();
            if (!newAccessToken) return observer.error(err);

            await AsyncStorage.setItem('at', newAccessToken);

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
