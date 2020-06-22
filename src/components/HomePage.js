import React, { useState } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Nav from './Nav'



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const useStateWithSessionStorage = (key) => {
    const [data, setData] = useState(sessionStorage.getItem('token') || "");
    return [data, setData]
    }
  const [data, setData] = useStateWithSessionStorage("token")


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            (app logo)....   App Name
          </Typography>
          <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <PersonAddIcon />
            </Badge>
          </IconButton>
          {/* <p>Messages</p> */}
          </MenuItem>
          <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <p>Notifications</p> */}
        </MenuItem>
          <Button 
            color="inherit"
            onClick={
              e => {
                e.preventDefault();
                sessionStorage.setItem("token", "")
                const getData = async () => {
                  const reset = {
                    data: data
                  }
                  const configs= {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    mode: "cors",
                    body: JSON.stringify(reset)
                  }                    
                  const response = await fetch("http://localhost:5000/api/logout", configs);
                  const output = await response.json();
                  console.log(output);
                  history.push('/login')
                }
                getData()
              } 
            }
          >Logout</Button>
        </Toolbar>
      </AppBar>
      <Nav />
    </div>
  );
}
