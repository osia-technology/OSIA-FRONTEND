import { useState, ChangeEvent } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Switch
} from '@mui/material';
import { useTranslation } from 'react-i18next'; 

function NotificationsTab() {
  const { t } = useTranslation(); 
  const [state, setState] = useState({
    checkedA: true,
    checkedB: false,
    checkedC: true,
    checkedD: false
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">{t('notificationsTab.account.title')}</Typography>
          <Typography variant="subtitle2">
            {t('notificationsTab.account.subtitle')}
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={t('notificationsTab.account.withdrawActivity.primary')}
                secondary={t('notificationsTab.account.withdrawActivity.secondary')}
              />
              <Switch
                color="primary"
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={t('notificationsTab.account.weeklyReport.primary')}
                secondary={t('notificationsTab.account.weeklyReport.secondary')}
              />
              <Switch
                color="primary"
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedB"
              />
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">{t('notificationsTab.orders.title')}</Typography>
          <Typography variant="subtitle2">
            {t('notificationsTab.orders.subtitle')}
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={t('notificationsTab.orders.failedPayment.primary')}
                secondary={t('notificationsTab.orders.failedPayment.secondary')}
              />
              <Switch
                color="primary"
                checked={state.checkedC}
                onChange={handleChange}
                name="checkedC"
              />
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary={t('notificationsTab.orders.orderStatusUpdate.primary')}
                secondary={t('notificationsTab.orders.orderStatusUpdate.secondary')}
              />
              <Switch
                color="primary"
                checked={state.checkedD}
                onChange={handleChange}
                name="checkedD"
              />
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}

export default NotificationsTab;
