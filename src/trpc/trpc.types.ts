import {TrpcRouter} from '@parknexus/api';
import {inferRouterInputs, inferRouterOutputs} from '@trpc/server';

export type RouterInput = inferRouterInputs<TrpcRouter>;
export type RouterOutput = inferRouterOutputs<TrpcRouter>;
