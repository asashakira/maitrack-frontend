import {Box, Typography} from '@mui/material';

import {User} from '@/types/api';

export const UserData = ({user}: {user: User}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        mt: 2,
        mb: 2,
        borderRadius: '6px',
        border: '1px solid rgb(195, 209, 220)',
      }}
    >
      <Box>
        <Typography>{user.totalPlayCount}</Typography>
        <Typography>{user.seasonPlayCount}</Typography>
      </Box>
    </Box>
  );
};
