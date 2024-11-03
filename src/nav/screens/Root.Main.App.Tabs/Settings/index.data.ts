import {trpc} from '@src/trpc';

export function useMe() {
    const response = trpc.user.profile.get.single.useQuery();

    const me = response.data;

    return Object.assign({me}, response);
}
