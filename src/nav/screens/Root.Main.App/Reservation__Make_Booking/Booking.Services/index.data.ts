import {trpc} from '@src/trpc';

export function useServiceDetail(serviceId?: number) {
    const response = trpc.parking.lot.service.get.single.useQuery(
        {
            serviceId: serviceId!,
        },
        {
            enabled: !!serviceId,
        },
    );

    const service = response.data;

    return Object.assign({service}, response);
}
