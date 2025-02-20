import {api} from '@/lib/api-client';
import {ScoresResponse} from '@/types/api';

export const fetchScores = async ({
  pageParam = 0,
  maiID,
}: {
  pageParam: number;
  maiID: string;
}): Promise<{
  data: ScoresResponse;
}> => {
  return api.get(
    `/users/by-mai-id/${maiID}/scores?limit=10&offset=${pageParam}`,
  );
};
