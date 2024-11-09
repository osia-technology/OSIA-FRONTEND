import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next'; 
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';
function PageHeader() {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        {t('pageHeader.title')} 
      </Typography>
      <Typography variant="subtitle2">
        {t('pageHeader.subtitle', { userName: user.username })} 
      </Typography>
    </>
  );
}

export default PageHeader;
