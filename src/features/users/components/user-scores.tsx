import {Box} from '@mui/material';

import {UserScore} from '@/types/api';

import {useUserScores} from '../api/get-user-scores';

export const UserScores = ({maiID}: {maiID: string}) => {
  const userScoresQuery = useUserScores({maiID});

  if (userScoresQuery.isLoading) {
    // TODO: loading
    return <Box>Loading...</Box>;
  }

  const scores: UserScore[] | undefined = userScoresQuery.data?.data;

  if (!scores || scores.length === 0)
    // TODO: better error message
    return <Box sx={{marginTop: 3}}>Scores Not Found</Box>;

  return (
    <>
      {scores.map((score: UserScore) => (
        <Box key={score.scoreID} sx={{marginTop: 3}}>
          <Box>{score.accuracy}</Box>
          <Box>{score.playedAt}</Box>
        </Box>
      ))}
    </>
  );
};
