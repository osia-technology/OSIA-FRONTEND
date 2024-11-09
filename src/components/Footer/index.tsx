import { Box, Container, Link, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';



const FooterWrapper = styled(Container)(
  ({ theme }) => `
        margin-top: ${theme.spacing(4)};
`
);

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper className="footer-wrapper">
      <Box
        pb={4}
        display={{ xs: 'block', md: 'flex' }}
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        justifyContent="space-between"
        mt={20}
      >
        <Box>
          <Typography variant="subtitle1">
            &copy; {currentYear} - OSIA Technologies
          </Typography>
        </Box>
        <Typography
          sx={{
            pt: { xs: 2, md: 0 }
          }}
          variant="subtitle1"
        >
          {t('copyright')}
        </Typography>
      </Box>
    </FooterWrapper>
  );
}

export default Footer;
