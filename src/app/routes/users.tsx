import {Container} from '@mui/material';
import {useParams} from 'react-router-dom';

import {UserPage} from '@/features/users/components/user-page';

const UserRoute = () => {
  const params = useParams();
  const maiID = params.maiID as string;

  return (
    <Container
      sx={{
        marginTop: 2,
      }}
    >
      <UserPage maiID={maiID} />
    </Container>
  );
};

export default UserRoute;
