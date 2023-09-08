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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Navbar from './Navbar';

const drawerOptions = Array(
    {
        'text': 'Fixtures',
        'link': '/'
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
    const drawerWidth = 240;
    return(
    
      <Drawer position="relative"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
          variant: 'persistent'
        }}
        variant="permanent"
        // anchor="left"
      >
        <div className='classes.toolbar'/>
        <Toolbar />
        <Divider />
        <Toolbar />
        <Divider /><Toolbar />
        <Divider />
        <Toolbar> 
            <Typography variant="h6" noWrap component="div">League Name</Typography>
        </Toolbar>
        <Divider />
        <List>
          {drawerOptions.map((option, index) => (
            <ListItem key={option.text} disablePadding>
              <ListItemButton>
                <ListItemText primary={option.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
      </Drawer>
     
    );
}

export default FLDrawer;