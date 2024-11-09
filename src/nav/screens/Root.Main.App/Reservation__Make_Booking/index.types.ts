import {TrpcOutput} from '@src/trpc';

export type TBookingStep = 'DATE_TIME' | 'VEHICLE' | 'SERVICES' | 'PAYMENT';

export type TVehicle = TrpcOutput['user']['vehicle']['get']['many'][number];
export type TService = TrpcOutput['parking']['lot']['service']['get']['single'];
