import {trpc} from '@src/trpc';

export function useMyVehicles() {
    const response = trpc.user.vehicle.get.many.useQuery({});

    const vehicles = response?.data || [];

    return Object.assign({vehicles}, response);
}
