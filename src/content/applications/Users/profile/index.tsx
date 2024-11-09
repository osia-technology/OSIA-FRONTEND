import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Grid, Container } from '@mui/material';

import ProfileCover from './ProfileCover';

import { useTranslation } from 'react-i18next'; 
import { useSelector } from 'react-redux';
import { RootState } from 'src/app/store';

function ManagementUserProfile() {
  const { t } = useTranslation(); 
  const user = useSelector((state: RootState) => state.user.user);


  return (
    <>
      <Helmet>
        <title>{t('userProfileTitle')}</title> 
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            <ProfileCover user={user} />
          </Grid>
 
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
