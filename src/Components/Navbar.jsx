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

const pages = Array(
    {
        'text': 'Home',
        'link': '/'
    },
    {
        'text': 'Fixture',
        'link': '/fixture/1'
    },
    {
        'text': 'Your Squad',
        'link': '/squad/view'
    },
    {
        'text': 'Friends\' League',
        'link': '/friends-league'
    },
    {
        'text': 'Standings',
        'link': '/standings'
    },
    {
        'text': 'Stats',
        'link': '/stats'        
    }
);
const settings = ['Profile', 'Register', 'Login', 'Logout'];


function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [active, setActive] = useState(pages[0]);
  const qlink = window.location.href;
  const tokens = qlink.split('/');
  const link = tokens[3];
  useEffect(() => {
    if(link === 'fixture') {
      setActive(pages[1]);
    }
    else if(link === 'squad' || link === 'playingxi' || link === 'transfer-window') {
      setActive(pages[2]);
    }
    else if(link === 'friends-league') {
      setActive(pages[3]);
    }
    else if(link === 'standings') {
      setActive(pages[4]);
    }
    else if(link === 'stats') {
      setActive(pages[5]);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
    if(page.text === 'Your Squad') {
      console.log(event.currentTarget);
      setAnchorEl(event.currentTarget);
    } 
    else if(page.text === 'Stats') {
      console.log(event.currentTarget);
      setAnchorEl(event.currentTarget);
    } 
    else {
      setActive(page)
      navigate(page.link);
    }
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSquadOption = (str) => {
    setAnchorEl(null);
    navigate("/"+str);
  }
  const handleLogout = () => {
    userLogout().then(res => {
      if(res === "User logged out")navigate('/');
    })
  }

  const handleRegister = () => {
    navigate('/register');
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
                
                endIcon={page.text==="Your Squad" || page.text === "Stats"? <KeyboardArrowDownSharp /> : undefined}
              >
                {page.text}
              </Button>
                {page.text==='Your Squad' && <>
                    <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={anchorEl !== null && anchorEl.innerText === 'YOUR SQUAD'}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={()=>{navigate("/playingxi/default")}}>Playing XI</MenuItem>
                    <MenuItem onClick={()=>{navigate("/transfer-window")}}>Transfer Window</MenuItem>
                    <MenuItem onClick={()=>{navigate("/squad/view")}}>Your Squad</MenuItem>
                  </Menu>
                </>
                }
                {page.text==='Stats' && <>
                    <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={anchorEl !== null && anchorEl.innerText === 'STATS'}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={()=>{navigate("/stats/teams")}}>Team Stat</MenuItem>
                    <MenuItem onClick={()=>{navigate("/stats/players")}}>Player Stat</MenuItem>
                  </Menu>
                </>
                }

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
                    setting === 'Profile'? navigate('/profile') : 
                    setting === 'Login' ? navigate('/login') : 
                    setting === 'Logout' ? handleLogout() : 
                    setting === 'Register' ? handleRegister() : handleOpenUserMenu()}}>
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
export default Navbar;