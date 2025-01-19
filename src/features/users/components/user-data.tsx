import {Box} from '@mui/material';
import {useParams} from 'react-router-dom';

import {User} from '@/types/api';

import {useUser} from '../api/get-user';

export const UserData = () => {
  const params = useParams();
  const gameName = params.gameName as string;
  const tagLine = params.tagLine as string;

  const userQuery = useUser({
    gameName,
    tagLine,
  });

  if (userQuery.isLoading) {
    return <Box>Error</Box>;
  }

  const user: User | undefined = userQuery?.data?.data;

  if (!user) return null;

  return (
    <>
      <Box>{'Name: ' + gameName}</Box>
      <Box>{'Rating: ' + user.rating}</Box>
      <Box>{'Play Count: ' + user.totalPlayCount}</Box>
    </>
  );
};
