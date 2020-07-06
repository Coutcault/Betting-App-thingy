import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Form } from 'react-bootstrap';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export default function Profile () {
    const [friendsList, setFriendsList] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [setTrue, setSetTrue] = useState(true)
    const classes = useStyles();
    // const [] = useState();
    // const [] = useState();
    // const [] = useState();
    // const [] = useState();
    // const [] = useState();


    const useStateWithSessionStorage = (key) => {
        const [data, setData] = useState(sessionStorage.getItem('token') || "");
        // console.log(data)
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
            return (setFriendsList(output[0]), setUserInfo(output[1]))
            }
        getUserInformation();
        }, []
    )

    return (
        <div className='container'>
        {/* <form className={classes.root} noValidate autoComplete="off"> */}
        <div>
        <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder={userInfo[3]} disabled={setTrue} value={userInfo[3]}/>
        </Form.Group>
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder={userInfo[4]}
                disabled={setTrue}
                value={userInfo[4]}
            />
        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder={userInfo[5]} disabled={setTrue} value={userInfo[5]} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Venmo username</Form.Label>
            <Form.Control placeholder="" disabled={setTrue} value="" />
        </Form.Group>
        </div>
        {/* </form> */}
        {setTrue ? 
            <a class="waves-effect waves-light btn" onClick={e => setSetTrue(false)}>Edit Info</a>
            :
            <a class="waves-effect waves-light btn" onClick={e => setSetTrue(true)}>Update Info</a>}
        
        <div className={classes.root}>
        <br></br><br></br>
        <h6>Friends</h6>
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
    )

}