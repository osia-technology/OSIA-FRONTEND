import { Helmet } from 'react-helmet-async';
import PageHeader from '../layout/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import { useTranslation } from 'react-i18next';

function DashboardSchoolManager() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t('osia')}</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          {/* <Grid item xs={12}>
            <HomeSchoolDiagram />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardSchoolManager;
