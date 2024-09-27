import {trpc} from '@src/trpc';

export function useData() {
  const response = trpc.user.profile.get.single.useQuery();

  return response;
}
