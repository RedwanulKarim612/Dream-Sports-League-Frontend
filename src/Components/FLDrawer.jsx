import {React, useEffect, useState} from 'react';
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
import { getFLInfo } from '../api/User';

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
        'link': '/starting-team'
    }
)


const FLDrawer = (props) => {
    const qlink = window.location.href;
    const tokens = qlink.split('/');
    const flId = tokens[4];
    const drawerWidth = 240;
    const navigate = useNavigate();
    const [leagueName, setLeagueName] = useState('');
    const [active, setActive] = useState(null);
    useEffect(()=>{
      getFLInfo(flId).then((res)=>{
        setLeagueName(res.name);
      })
      let page = tokens[tokens.length-1];
      if(page === 'admin'){
        setActive(drawerOptions[0]);
      }
      else if(page === 'fixtures'){
        setActive(drawerOptions[1]);
      }
      else if(page === 'standings'){
        setActive(drawerOptions[2]);
      }
      else if(page === 'starting-team'){
        setActive(drawerOptions[3]);
      }
    },[]);
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
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4">{leagueName}</Typography>
          </div>
        </Toolbar>
        <Divider />
        <List>
          {drawerOptions.map((option, index) => (
            (option.text!=='Admin' || props.role==='admin') &&
            <ListItem key={option.text} sx={active===option ? {borderLeft: 1, borderColor: 'green', borderWidth: '3px'}:{}}disablePadding>
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