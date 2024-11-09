import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ListSubheader,
  List,
  Button,
  ListItem
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { SidebarContext } from 'src/contexts/SidebarContext';

import HomeIcon from '@mui/icons-material/Home';
import DomainIcon from '@mui/icons-material/Domain';
import TrendingUp from '@mui/icons-material/TrendingUp';
import FolderSpecial from '@mui/icons-material/FolderSpecial';
import { MessageOutlined, SmartToy, Subject } from '@mui/icons-material';
import {MenuWrapper, SubMenuWrapper} from "src/styled/SideBarStyles";
import { selectRole } from 'src/store';
import { useSelector } from 'react-redux';
import { getHomePathByRole } from 'src/utils/helpers';
import { usePermissions } from 'src/utils/permissions/usePermissions';

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const path = "/dashboard/"+ getHomePathByRole(role);
  const canReadSchoolManager = usePermissions(['school#read_manager']);
  const is_schoolOficial = role == "school_official" ? true : false;
  const is_student = role == "student" ? true : false;

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
               {t('dashboard')}
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to={path}
                  startIcon={<HomeIcon />}
                >
                   {t('home')}
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
          {is_student && (
            <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/dashboard/chat"
                  startIcon={<SmartToy />}
                >
                   {t('ALLADIN')}
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
          )}
          
        </List>

       {canReadSchoolManager && (<List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
               {t('management')}
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/schools"
                  startIcon={<DomainIcon />}
                >
                   {t('schools')}
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/levels"
                  startIcon={<TrendingUp />}
                >
                   {t('levels')}
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/specialities"
                  startIcon={<FolderSpecial />}
                >
                   {t('special')}
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> 
      )}
      {is_schoolOficial && (<List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
               {t('management')}
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/classes"
                  startIcon={<DomainIcon />}
                >
                   Classes
                </Button>
              </ListItem>
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/management/subjects"
                  startIcon={<Subject />}
                >
                   {t('subject')}
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List> 
      )}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
