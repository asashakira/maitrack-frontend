import {Box} from '@mui/material';
import {useParams} from 'react-router-dom';

import {User} from '@/types/api';

import {useUser} from '../api/get-user';

import {UserData} from './user-data';
import {UserScores} from './user-scores';

export const UserPage = () => {
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
      <UserData />
      <UserScores />
    </>
  );
};
