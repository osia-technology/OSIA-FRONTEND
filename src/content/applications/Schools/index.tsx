import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Box } from '@mui/material';
import Footer from 'src/components/Footer';
import DynamicIconBreadcrumbs from 'src/components/DynamicIconBreadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import Schools from './Schools';
import { useTranslation } from 'react-i18next';
import { selectRole } from 'src/store';
import { useSelector } from 'react-redux';
import { getHomePathByRole } from 'src/utils/helpers';

function SchoolLayout() {
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const path = "/dashboard/"+ getHomePathByRole(role);
  
  const breadcrumbs = [
    { title: t('home'), href: path, icon: HomeIcon },
    { title: t('schools'), href: '/schools', icon: DomainIcon }
  ];
  return (
    <>
      <Helmet>
        <title>{t('my_schools')}</title>
      </Helmet>
      <Box sx={{ padding: '16px 15px', backgroundColor: '#f7f7f7' }}> 
        <Container maxWidth="lg">
          <DynamicIconBreadcrumbs breadcrumbs={breadcrumbs} />
        </Container>
      </Box>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      {/* <Container maxWidth="lg"> */}
        {/* <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12}> */}
            <Schools />
          {/* </Grid>
        </Grid> */}
      {/* </Container> */}
      <Footer />
    </>
  );
}

export default SchoolLayout;
