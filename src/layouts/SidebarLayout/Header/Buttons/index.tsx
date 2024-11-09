import React, { useState, useEffect } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag";


function HeaderButtons() {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const handleChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
      <HeaderSearch />
      
      <Select
        value={language || 'fr'}
        onChange={handleChange}
        variant="outlined"
        sx={{ mx: 1 }}
        size="small"
      >
        <MenuItem value="en">
          <ReactCountryFlag 
            countryCode="GB" 
            svg 
            style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }} 
            title="English"
          /> 
          <Box component="span" sx={{ marginLeft: '8px', display: { xs: 'none', sm: 'inline' } }}>
                {t('lang_en')}
          </Box>
        </MenuItem>
        <MenuItem value="fr">
          <ReactCountryFlag 
            countryCode="FR" 
            svg 
            style={{ width: '1.5em', height: '1.5em', marginRight: '0.5em' }} 
            title="Français"
          /> 
           <Box component="span" sx={{ marginLeft: '8px', display: { xs: 'none', sm: 'inline' } }}>
                {t('lang_fr')}
            </Box>
        </MenuItem>
      </Select>

      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
