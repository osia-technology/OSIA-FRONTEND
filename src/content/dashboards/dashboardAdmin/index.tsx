import { Helmet } from 'react-helmet-async';
import PageHeader from '../layout/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import HomeSchoolDiagram from './HomeSchoolDiagram';
import { useTranslation } from 'react-i18next';


function Dashboard() {
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
          <Grid item xs={12}>
            <HomeSchoolDiagram />
          </Grid>
          {/* <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid> */}
          {/* <Grid item xs={12}>
            <WatchList />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
