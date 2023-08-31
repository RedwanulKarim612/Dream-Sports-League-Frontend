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
        'link': '/squad'
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
const settings = ['Profile', 'Logout'];


function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

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
      setAnchorEl(event.currentTarget);
    } 
    else navigate(page.link);
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
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar position="static">
    <CssBaseline/>
      <Container maxWidth="xl">
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
                sx={{ my: 1, color: 'white', display: 'flex' }}
                
                endIcon={page.text==="Your Squad"? <KeyboardArrowDownSharp /> : undefined}
              >
                {page.text}
              </Button>
                {page.text==='Your Squad' && <>
                <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
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
                <MenuItem onClick={()=>{navigate("/squad")}}>Transfer Window</MenuItem>
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
                <MenuItem key={setting} onClick={()=>{setting === 'Profile'? navigate('/profile') : handleOpenUserMenu()}}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default Navbar;