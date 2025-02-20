import {useQuery, queryOptions} from '@tanstack/react-query';

import {api} from '@/lib/api-client';
import {QueryConfig} from '@/lib/react-query';
import {User} from '@/types/api';

export const getUser = ({maiID}: {maiID: string}): Promise<{data: User}> => {
  return api.get(`/users/by-mai-id/${maiID}`);
};

export const getUserQueryOptions = (maiID: string) => {
  return queryOptions({
    queryKey: ['users', maiID],
    queryFn: () => getUser({maiID}),
  });
};

type UseUserOptions = {
  maiID: string;
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = ({maiID, queryConfig}: UseUserOptions) => {
  return useQuery({
    ...getUserQueryOptions(maiID),
    ...queryConfig,
  });
};
