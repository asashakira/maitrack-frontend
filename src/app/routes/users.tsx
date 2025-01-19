import {Container} from '@mui/material';

import {UserPage} from '@/features/users/components/user-page';

const UserRoute = () => {
  return (
    <Container
      sx={{
        marginTop: 2,
      }}
    >
      <UserPage />
    </Container>
  );
};

export default UserRoute;
