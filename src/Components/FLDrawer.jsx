import {React} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

const URLPrefix = '/friends-league/';
const drawerOptions = Array(
    {
        'text': 'Admin',
        'link': '/admin'
    },  
    {
        'text': 'Fixtures',
        'link': '/fixtures'
    },
    {
        'text': 'Standings',
        'link': '/standings'
    },
    {
        'text': 'Your Starting Team',
        'link': '/squad/view'
    }
)


const FLDrawer = () => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const flId = tokens[4];
    const drawerWidth = 240;
    const navigate = useNavigate();
    console.log(flId);
    const handleDrawerClick = (option)=>{
        // console.log('Drawer Clicked');
        // console.log('/friends-league/' + flId + option.link);
        navigate('/friends-league/' + flId + option.link);
    }
    return(
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            position: 'absolute',
            width: drawerWidth,
            marginTop: '180px',
          },
        //   variant: 'persistent',
        //   marginTop: '200px',
        }}
        variant="permanent"
        anchor="left"
      >
        <div/>
        <Toolbar> 
            <Typography variant="h6" noWrap component="div">League Name</Typography>
        </Toolbar>
        <Divider />
        <List>
          {drawerOptions.map((option, index) => (
            <ListItem key={option.text} disablePadding>
              <ListItemButton onClick={()=>{handleDrawerClick(option)}}>
                <ListItemText primary={option.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
     
    );
}

export default FLDrawer;