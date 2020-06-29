import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function PendingBets(){
    const classes = useStyles();
    const [activeBets, setActiveBets] = useState([])
    const [activeOppBets, setActiveOppBets] = useState([])
    const [winner, setWinner] = useState("")
    const [incompleted, setInompleted] = useState(true)

    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
  
    // const handleClose = () => {
    //   setOpen(false);
    // };

    const useStateWithSessionStorage = (key) => {
        const [data, setData] = useState(sessionStorage.getItem('token') || "");
        return data
        }
      const auth_token = useStateWithSessionStorage()
      
      
        useEffect(() => {
            const getActiveBets = async () => {
                const data = {
                    auth_token: auth_token
                }
                const configs= {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    mode: "cors",
                    body: JSON.stringify(data)
                }
                const response = await fetch("http://localhost:5000/get_all_made_active_bets", configs);
                const output = await response.json();
                setActiveBets(output)
                }
            getActiveBets();
                const getPendingAB = async () => {
                const data = {
                    auth_token: auth_token
                    }
                const configs= {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    mode: "cors",
                    body: JSON.stringify(data)
                }
                    const response = await fetch("http://localhost:5000/get_all_against_active_bets", configs);
                    const output1 = await response.json();
                    setActiveOppBets(output1)
                }
            getPendingAB()  
          },[]  
        )
    console.log(activeBets)
    console.log(activeOppBets)


    
    return(
        <div>
                {activeBets.map(
                    (bet) => {
                    return (<ul class="collection">
                            <li class="collection-item">{bet[10]}: {bet[9].slice(0, 15)}</li>
                            <li>With: {bet[5]}</li>
                            <li>{bet[6]}: {bet[7]}</li>
                            <li>Risking: ${bet[11]}</li>
                            <li>To Win: ${bet[12]}</li><br></br>
                            <li>
                            <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Winner</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={winner}
                                onChange={e => setWinner(e.target.value)}
                                label="User"
                                >
                                <MenuItem value={bet[2]}>{bet[2]}</MenuItem>
                                <MenuItem value={bet[2]}>{bet[5]}</MenuItem>
                                </Select>
                            </FormControl><div id='outputarea'></div></li>
                            <li>
                            <Button onClick={
                                        e => {
                                            e.preventDefault();
                                                if (winner === ""){
                                                    const outPutDiv = document.getElementById("outputarea");
                                                    outPutDiv.innerHTML = "*Please select a winner.";
                                                }}
                                                }>Pay</Button>
                            <Button>Request</Button></li>
                            {/* <select>
                                <option value="" disabled selected>Select Winner</option>
                                <option value="1">{bet[2]}</option>
                                <option value="2">{bet[5]}</option>
                                </select>
                                <label>Select Winner</label> */}
                            
                            </ul>)})}
                            
                {activeOppBets.map(
                    (bet) => {
                    return (<ul class="collection">
                            <li class="collection-item">{bet[10]}: {bet[9].slice(0, 15)}</li>
                            <li>With: {bet[2]}</li>
                            <li>{bet[6]}: {bet[7]}</li>
                            <li>Risking: ${bet[3]}</li>
                            <li>To Win: ${bet[4]}</li><br></br>
                            <li>
                            <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Winner</InputLabel>
                                <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                // value={betUser}
                                // onChange={e => setBetUser(e.target.value)}
                                label="User"
                                >
                                <MenuItem value={10}>{bet[2]}</MenuItem>
                                <MenuItem value={20}>{bet[5]}</MenuItem>
                                </Select>
                            </FormControl></li>
                            <li>
                            <Button>Pay</Button>
                            <Button>Request</Button></li>
                            {/* <select>
                                <option value="" disabled selected>Select Winner</option>
                                <option value="1">{bet[2]}</option>
                                <option value="2">{bet[5]}</option>
                                </select>
                                <label>Select Winner</label> */}
                            </ul>)})}
                        


            
        </div>
    )}

