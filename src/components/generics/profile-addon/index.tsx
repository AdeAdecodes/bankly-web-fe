import { Avatar, Hidden, Typography } from '@mui/material';
import { Column, Row } from '~/components/shared/layout';
import Ripple from '~/components/shared/ripple';
import stringToRGB from '~/utils/string-to-rgb';

const user = {
  name: 'User X',
};

function ProfileAddon() {
  return (
    <Row gap={2} crossAxisAlignment="center">
      <Hidden smDown>
        <Column crossAxisAlignment="end">
          <Typography variant="body2" fontWeight={600}>
            52-12A-9H4&nbsp;&nbsp;|&nbsp;&nbsp;seyi@webcoupers.com
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manager
          </Typography>
        </Column>
      </Hidden>
      <Ripple sx={{ borderRadius: '50%' }}>
        <Avatar
          sx={{
            width: { xs: 32, sm: 48 },
            height: { xs: 32, sm: 48 },
            bgcolor: stringToRGB(user.name),
          }}
        >
          <Typography>{user.name[0]}</Typography>
        </Avatar>
      </Ripple>
    </Row>
  );
}

export default ProfileAddon;
