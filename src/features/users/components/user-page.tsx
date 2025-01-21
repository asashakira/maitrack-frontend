import {Box} from '@mui/material';

import {User} from '@/types/api';

import {useUser} from '../api/get-user';

import {UserScores} from './user-scores';

export const UserPage = ({maiID}: {maiID: string}) => {
  const userQuery = useUser({
    maiID,
  });

  if (userQuery.isLoading) {
    // TODO: loading
    return <Box>Loading...</Box>;
  }

  const user: User | undefined = userQuery?.data?.data;

  if (!user) return <Box>User Not Found</Box>;

  return (
    <>
      <Box>{'Name: ' + user.gameName + '#' + user.tagLine}</Box>
      <Box>{'Rating: ' + user.rating}</Box>
      <Box>{'Play Count: ' + user.totalPlayCount}</Box>
      <UserScores maiID={maiID} />
    </>
  );
};
