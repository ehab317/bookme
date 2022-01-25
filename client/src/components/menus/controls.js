import { useEffect } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import BusinessIcon from '@mui/icons-material/Business';
import {Link} from 'react-router-dom';
import './menus.css';

export default function Controls() {

  return (
      <Box className="controls-menu" sx={{ width: '100%', maxWidth: 250, height: '92vh', bgcolor: 'background.paper', position: 'fixed', bottom:0,  zIndex:9 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/dashboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="לוח בקרה" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/businesses">
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="עסקים" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/units">
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="יחידות" />
              </ListItemButton>
            </ListItem>
          </List>
        <Divider />
      </Box>
  );
}