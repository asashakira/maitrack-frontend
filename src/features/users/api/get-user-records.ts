import {useQuery, queryOptions} from '@tanstack/react-query';

import {api} from '@/lib/api-client';
import {QueryConfig} from '@/lib/react-query';
import {UserScore} from '@/types/api';

export const getUserScores = ({
  gameName,
  tagLine,
}: {
  gameName: string;
  tagLine: string;
}): Promise<{data: UserScore[]}> => {
  return api.get(`/users/by-mai-id/${gameName}/${tagLine}/data`);
};

export const getUserScoresQueryOptions = (
  gameName: string,
  tagLine: string,
) => {
  return queryOptions({
    queryKey: [],
    queryFn: () => getUserScores({gameName, tagLine}),
  });
};

type UseUserScoresOptions = {
  gameName: string;
  tagLine: string;
  queryConfig?: QueryConfig<typeof getUserScoresQueryOptions>;
};

export const useUserScores = ({
  gameName,
  tagLine,
  queryConfig,
}: UseUserScoresOptions) => {
  return useQuery({
    ...getUserScoresQueryOptions(gameName, tagLine),
    ...queryConfig,
  });
};
