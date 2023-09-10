import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ClickAwayListener, CssBaseline, Grow, Menu, MenuList, Paper, Popper, ThemeProvider, createTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { KeyboardArrowDownSharp, KeyboardArrowDownTwoTone } from '@mui/icons-material';
import { userLogout } from "../api/User";
import TopBar from './TopBar';
import { useEffect } from 'react';
import { adminLogout } from '../api/Admin';

const pages = Array(
    {
        'text': 'Best XI',
        'link': '/admin/bestxi'
    },
    {
        'text': 'matches',
        'link': '/admin/1'
    }
);
const settings = ['Login', 'Logout'];


function AdminNavbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [active, setActive] = useState(pages[0]);
  const qlink = window.location.href;
  const tokens = qlink.split('/');
  const link = tokens[tokens.length-1];
  useEffect(() => {
    if(link === 'bestxi') {
      setActive(pages[0]);
    }
    else if(link !== 'login') {
      setActive(pages[1]);
    }
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleNavBarClick = (event, page) => {
   
      setActive(page)
      navigate(page.link);
    
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleLogout = () => {
    adminLogout().then(res => {
      if(res === "Admin logged out")navigate('/admin/login');
    })
  }

  const navigate = useNavigate();
  const activeStyle = { my: 1, borderRadius: 0, borderWidth: '3px', borderBottom: 1, borderColor: '#0083d4', display: 'flex' }
  return (
    <div style={{marginBottom: '100px'}}>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <TopBar/>
        <Toolbar disableGutters>
           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DSL
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page,index) => (<>
              <Button
                key={index}
                onClick={(event)=>handleNavBarClick(event, page)}
                sx={active===page ? activeStyle :{ my: 1, color: 'white', display: 'flex' }}
                
              >
                {page.text}
              </Button>

              </>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={
                  ()=>{
                    setting === 'Login' ? navigate('/admin/login') : 
                    handleLogout()}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
    </div>
  );
}
export default AdminNavbar;