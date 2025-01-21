import {useQuery, queryOptions} from '@tanstack/react-query';

import {api} from '@/lib/api-client';
import {QueryConfig} from '@/lib/react-query';
import {UserScore} from '@/types/api';

export const getUserScores = ({
  maiID,
}: {
  maiID: string;
}): Promise<{data: UserScore[]}> => {
  return api.get(`/users/by-mai-id/${maiID}/scores`);
};

export const getUserScoresQueryOptions = (maiID: string) => {
  return queryOptions({
    queryKey: ['userScores', maiID],
    queryFn: () => getUserScores({maiID}),
  });
};

type UseUserScoresOptions = {
  maiID: string;
  queryConfig?: QueryConfig<typeof getUserScoresQueryOptions>;
};

export const useUserScores = ({maiID, queryConfig}: UseUserScoresOptions) => {
  return useQuery({
    ...getUserScoresQueryOptions(maiID),
    ...queryConfig,
  });
};
