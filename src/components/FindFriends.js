import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 900,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    height: 60
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [username, setUsername] = useState("")

  return (
    <div style={{textAlign:"center"}}>
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter Username"
        onChange={e => setUsername(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search"
        // onClick={
        //   e => {
        //     // e.preventDefault();
        //       const getData = async () => {
        //         const data = {
        //           user: username
        //           }
        //           const configs= {
        //             method: "POST",
        //             headers: {'Content-Type': 'application/json'},
        //             mode: "cors",
        //             body: JSON.stringify(data)
        //             }
        //             const response = await fetch("http://localhost:5000/find_user", configs);
        //             const output = await response.json();
        //             if (output === null){
        //               console.log(false)
        //               const outPutDiv = document.getElementById("ourOutput");
        //                 outPutDiv.innerHTML = "<p>* That user does not exist. </p>";
        //             }if (output){
        //               console.log(true)
        //               console.log(output)
        //             }
        //           }
        //           getData();
        //         }
        //       }    
            >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <PersonAddIcon />
      </IconButton>
    </Paper>
    <div id='ourOutput'></div>
    </div>
  );
}
