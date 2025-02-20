import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import {useInfiniteQuery} from '@tanstack/react-query';

import {Score} from '@/types/api';

import {fetchScores} from '../api/get-user-scores';

export const UserScores = ({maiID}: {maiID: string}) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['scores', maiID],
    queryFn: ({pageParam}) => fetchScores({pageParam, maiID}),
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.data.hasMore ? lastPage.data.nextOffset : undefined,
  });

  if (isLoading) {
    // TODO: loading
    return <Box>Loading...</Box>;
  }

  if (error) {
    // TODO: error
    return <Box>Error!!!</Box>;
  }

  return (
    <>
      {data?.pages.map(page =>
        page.data.scores.map((score: Score) => (
          <ScoreCard key={score.scoreID} score={score} />
        )),
      )}
      {hasNextPage && !isFetching && (
        <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          SHOW MORE
        </Button>
      )}

      {isFetching && <Box>Fetching more data...</Box>}
    </>
  );
};

const ScoreCard = ({score}: {score: Score}) => {
  return (
    <Card
      variant="outlined"
      sx={{boxShadow: 2, display: 'flex', m: 0, mb: 2, minWidth: 900}}
    >
      <CardMedia
        sx={{height: 150, width: 150}}
        image={score.imageUrl}
        title={score.title}
      />
      <CardContent
        sx={{display: 'flex', flex: 1, justifyContent: 'space-between'}}
      >
        <Box>
          <Typography>{score.title}</Typography>
          <Typography sx={{color: 'text.secondary', fontSize: '0.75rem'}}>
            by {score.artist}
          </Typography>
        </Box>
        <Typography component="div">{score.accuracy}</Typography>
      </CardContent>
    </Card>
  );
};
