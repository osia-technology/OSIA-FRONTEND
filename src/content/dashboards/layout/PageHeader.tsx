import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { selectRole, selectUsername } from 'src/store';
import { getUserAvatar } from 'src/utils/helpers';
import { SchoolAvatar } from 'src/assets/imagePath';

function PageHeader() {
  const username = useSelector(selectUsername);
  const theme = useTheme();
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const UserAvatar = getUserAvatar(role);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={username}
          src = {role == 'school_official' ? SchoolAvatar : UserAvatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
            {t('welcome_message', { username: username })}
        </Typography>
        <Typography variant="subtitle2">
              {t('admin_start_message')}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
