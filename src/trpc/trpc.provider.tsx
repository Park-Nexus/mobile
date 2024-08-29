import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {trpc} from './trpc';
import {httpBatchLink} from '@trpc/react-query';
import {authLinkInterceptor, headers} from './trpc.auth';
import {ApiTypes} from '../types';

type TrpcProviderProps = {
  children: React.ReactNode;
};
export const TrpcProvider = ({children}: TrpcProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {queries: {retry: false}},
      }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        authLinkInterceptor,
        httpBatchLink({
          url: ApiTypes.API_HOST,
          headers,
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
