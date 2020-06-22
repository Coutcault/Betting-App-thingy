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
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
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
  const [realUser, setRealUser] = useState(false)
  const useStateWithSessionStorage = (key) => {
    const [data, setData] = useState(sessionStorage.getItem('token') || "");
    return data
    }
  const auth_token = useStateWithSessionStorage()

  return (
    <div style={{textAlign:"center"}}>
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter Username"
        onChange={e => setUsername(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search"
         onClick={
           e => {
              e.preventDefault();
               const getData = async () => {
                 const data = {
                   username: username
                   }
                   const configs= {
                     method: "POST",
                     headers: {'Content-Type': 'application/json'},
                     mode: "cors",
                     body: JSON.stringify(data)
                     }
                     const response = await fetch("http://localhost:5000/find_user", configs);
                     const output = await response.json();
                     if (output === false){
                       console.log(false)
                       const outPutDiv = document.getElementById("ourOutput");
                         outPutDiv.innerHTML = `<p>* User '${username}' does not exist. </p>`;
                     }else if (output){
                       setRealUser(true)
                       console.log(true)
                       console.log(output)
                       const outPutDiv = document.getElementById("ourOutput");
                         outPutDiv.innerHTML = `<p>Username: ${output[0][3]}</p>
                                                <p>Record: ${output[0][7]}</p>`;
                     }
                   }
                   getData();
               }
              }    
            >
        <SearchIcon />
      </IconButton><br></br><br></br>
      {/* <Divider className={classes.divider} orientation="vertical" /> */}
      
    </Paper>
    <div id='ourOutput'></div>
    {/* <div id='output2'></div> */}
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<PersonAddIcon />}
        onClick={
          e => {
            e.preventDefault();
            if (realUser === true){
              const addUser = async () => {
                const data = {
                  username: username,
                  auth_token: auth_token
                  }
                  const configs= {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    mode: "cors",
                    body: JSON.stringify(data)
                    }
                    const response = await fetch("http://localhost:5000/add_friend", configs);
                    const output = await response.json();
                    if (output) {
                      console.log(output)
                      const outPutDiv = document.getElementById("ourOutput2");
                      outPutDiv.innerHTML = "Friend successfully added!";
                    } else {
                      const outPutDiv = document.getElementById("ourOutput2");
                      outPutDiv.innerHTML = "Error occured.. Please try again.";
                    
                    }
                  }  
                addUser();
            } else {const outPutDiv = document.getElementById("ourOutput2");
            outPutDiv.innerHTML = "Please search for an existing User!";
            }
          } 
        }
          
        >
          Add Friend
      </Button>
    <br></br><br></br>
    <div id='ourOutput2'></div>
    </div>
    
  );
}