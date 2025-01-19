import {Box} from '@mui/material';
import {useParams} from 'react-router-dom';

import {UserScore} from '@/types/api';

import {useUserScores} from '../api/get-user-records';

export const UserScores = () => {
  const params = useParams();
  const gameName = params.gameName as string;
  const tagLine = params.tagLine as string;

  const userScoresQuery = useUserScores({gameName, tagLine});

  if (userScoresQuery.isLoading) {
    return <Box>Error</Box>;
  }

  const scores: UserScore[] | undefined = userScoresQuery.data?.data;

  if (!scores) return null;

  return (
    <>
      {scores.map((score: UserScore) => (
        <Box key={score.id} sx={{margin: 2}}></Box>
      ))}
    </>
  );
};
