import React, { useState, useEffect } from 'react';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import { Form } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 4,
    height: 60,
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
  const [friendsList, setFriendsList] = useState([])
  const [username, setUsername] = useState("")
  const [realUser, setRealUser] = useState(false)
  const useStateWithSessionStorage = (key) => {
    const [data, setData] = useState(sessionStorage.getItem('token') || "");
    return data
    }
  const auth_token = useStateWithSessionStorage()

  useEffect(() => {
    const getUserInformation = async () => {
        const data = {
        auth_token: auth_token
        }
        const configs= {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        mode: "cors",
        body: JSON.stringify(data)
        }
        const response = await fetch("http://localhost:5000/get_user_info", configs);
        const output = await response.json();
        return (setFriendsList(output[0]))
        }
    getUserInformation();
    }, []
)

  return (
    <div className='search' >
    <div class="friendsearch">
    <div class="friendshow">
    <h6>Search User</h6><br></br><br></br>
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
                       setRealUser(false)
                       const outPutDiv = document.getElementById("ourOutput");
                         outPutDiv.innerHTML = `<p>* User '${username}' does not exist. </p>`;
                     }else if (output){
                       setRealUser(true)
                       console.log(true)
                       console.log(output)
                       const outPutDiv = document.getElementById("ourOutput");
                         outPutDiv.innerHTML = `<p>Username: ${output[0][3]}</p><br></br>
                                                <p>Record: ${output[0][7]}</p><br></br>`;
                      //  const outPutDiv2 = document.getElementById("ourOutput2");
                      //    outPutDiv2.innerHTML = <p>   </p>
                     }
                   }
                   getData();
               }
              }    
            >
        <SearchIcon />
      </IconButton>
      {/* <Divider className={classes.divider} orientation="vertical" /> */}
      
    </Paper><br></br><br></br>
    <div id='ourOutput'></div>
    {/* <div id='output2'></div> */}
    {realUser ?
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
                    if (output['FAILURE'] === "CANNOT ADD YOURSELF AS FRIEND"){
                      const outPutDiv = document.getElementById("ourOutput2");
                      outPutDiv.innerHTML = "*Unable to add yourself as a friend.";
                    }else if (output) {
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
      </Button> : ""}
    <br></br><br></br>
    <div id='ourOutput2'></div>
    </div>
    <div class="friendshow">
      <h6>Current Friends</h6><br></br><br></br>
            {
            friendsList.map(
                (friend) => {
                  return (<ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{friend[6]}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ul>
                        Name: {friend[4]} {friend[5]}<br></br>  
                        Record: {friend[10]}<br></br>  
                        {<a 
                                        class="waves-effect waves-light btn-small" 
                                        onClick={
                                            e => {
                                                e.preventDefault();
                                                const deleteUser = async () => {
                                                const data = {
                                                    username: friend[6],
                                                    auth_token: auth_token
                                                    }
                                                const configs= {
                                                    method: "POST",
                                                    headers: {'Content-Type': 'application/json'},
                                                    mode: "cors",
                                                    body: JSON.stringify(data)
                                                    }
                                                const response = await fetch("http://localhost:5000/delete_friend", configs);
                                                const output = await response.json();
                                                console.log(output)
                                                }
                                            deleteUser()
                                            }
                                        }
                                        >Remove Friend</a>}
                        </ul>
                        {/* <Typography>Name: {friend[4]}</Typography><br></br>
                        <Typography> Record: {friend[10]}</Typography>
                        <Typography>{<a 
                                        class="waves-effect waves-light btn-small" 
                                        onClick={
                                            e => {
                                                e.preventDefault();
                                                const deleteUser = async () => {
                                                const data = {
                                                    username: friend[6],
                                                    auth_token: auth_token
                                                    }
                                                const configs= {
                                                    method: "POST",
                                                    headers: {'Content-Type': 'application/json'},
                                                    mode: "cors",
                                                    body: JSON.stringify(data)
                                                    }
                                                const response = await fetch("http://localhost:5000/delete_friend", configs);
                                                const output = await response.json();
                                                console.log(output)
                                                }
                                            deleteUser()
                                            }
                                        }
                                        >Remove Friend</a>}</Typography> */}
                    </ExpansionPanelDetails>
                    </ExpansionPanel>);
                })
              }
    </div>
    </div>
    </div>
    
  );
}