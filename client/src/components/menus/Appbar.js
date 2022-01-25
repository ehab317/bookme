import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../actions/user';
import { collapseMenu } from '../../actions/menus';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {

    const { user } = useSelector((state) => ({...state}));
    const { menu } = useSelector((state) => ({...state}));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCollapse = async () => {
      const res = await dispatch(collapseMenu(menu.collapsed));
    }

    var userName = '';
    if (user.user) {
      userName = user.user.name;
    }
    // const name = user.user.name;
    // const letter = name.charAt(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        const res = await dispatch(logout());
        if (res) {
            navigate('/login');
        }
    };

    const pointer = {cursor: 'pointer'};

  return (
    <Box sx={{ flexGrow: 1, position:'sticky', top: 0, zIndex:9 }}>
      <AppBar position="static" sx={{ bgcolor: deepPurple[500], height: '8vh' }}>
        <Toolbar>
          <IconButton
            onClick={handleCollapse}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            BMS - מערכת ניהול בוקינג
          </Typography>
          <Stack direction="row" spacing={2}>
              {user ? <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>{userName}</Typography> : ''}
            <Avatar style={pointer} onClick={handleClick}></Avatar>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>החשבון שלי</MenuItem>
                <MenuItem onClick={handleClose, handleLogout}>התנתקות</MenuItem>
            </Menu>
        </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Appbar;
