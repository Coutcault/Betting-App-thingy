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
import 'materialize-css/dist/css/materialize.min.css'


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
    const [venUsername, setVenUsername] = useState("")
    const [venPassword, setVenPassword] = useState("")
    const [activeBets, setActiveBets] = useState([])
    const [activeOppBets, setActiveOppBets] = useState([])
    const [winner, setWinner] = useState("")
    const [incompleted, setInompleted] = useState(true)
    const [confirmed, setConfirmed] = useState(true)

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
            getPendingAB();
            const M = window.M;
            document.addEventListener('DOMContentLoaded', function() {
                const elems = document.querySelectorAll('.modal');
                const instances = M.Modal.init(elems, {});
          })
         }, []  
        )
    console.log(activeBets)
    console.log(activeOppBets)


    
    return(
        <div className='container' >
            <div class="activebets">
                {activeBets.map(
                    (bet) => {
                    return (
                            <ul class="collection">
                            <li class="collection-item">{bet[10]}: {bet[9].slice(0, 15)}</li>
                            <div class="betinfo">
                            <li>With: {bet[5]}</li>
                            <li>{bet[6]}: {bet[7]}</li>
                            <li>Risking: ${bet[11]}</li>
                            <li>To Win: ${bet[12]}</li>
                            </div><br></br>
                            <div class="betinfo">
                            <li>
                            {confirmed ?
                            <div>
                            <Button
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        setConfirmed(false)
                                    }
                                }>Pay with Venmo</Button>
                            <Button
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        setConfirmed(false)
                                    }
                            }>Request with Venmo</Button>
                            <Button
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        const endBet = async () => {
                                            const data = {
                                                auth_token: auth_token,
                                                bet_pk: bet[0],
                                                priv: bet[1],
                                                betCreator: bet[2],
                                                amountUserAtRisk: bet[3],
                                                amountUserWin: bet[4],
                                                betUser: bet[5],
                                                typeOfBet: bet[6],
                                                line: bet[7],
                                                odds: bet[8],
                                                betDate: bet[9],
                                                betDescription: bet[10],
                                                amountAtRisk: bet[11],
                                                amountWin: bet[12],
                                                friend_pk: bet[13],
                                                user_pk: bet[14],
                                                result: 'Payed'
                                            }
                                            const configs= {
                                                method: "POST",
                                                headers: {'Content-Type': 'application/json'},
                                                mode: "cors",
                                                body: JSON.stringify(data)
                                            }
                                            const response = await fetch("http://localhost:5000/end_bet", configs);
                                            const output = await response.json();
                                            if (output === true) {
                                                setConfirmed(false)
                                            }
                                            console.log(output)
                                        }; endBet();
                                    } 
                                }  
                                >Pay With Other Method</Button>
                            <Button
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        const endBet = async () => {
                                            const data = {
                                                auth_token: auth_token,
                                                bet_pk: bet[0],
                                                priv: bet[1],
                                                betCreator: bet[2],
                                                amountUserAtRisk: bet[3],
                                                amountUserWin: bet[4],
                                                betUser: bet[5],
                                                typeOfBet: bet[6],
                                                line: bet[7],
                                                odds: bet[8],
                                                betDate: bet[9],
                                                betDescription: bet[10],
                                                amountAtRisk: bet[11],
                                                amountWin: bet[12],
                                                friend_pk: bet[13],
                                                user_pk: bet[14],
                                                result: 'Requested'
                                            }
                                            const configs= {
                                                method: "POST",
                                                headers: {'Content-Type': 'application/json'},
                                                mode: "cors",
                                                body: JSON.stringify(data)
                                            }
                                            const response = await fetch("http://localhost:5000/end_bet", configs);
                                            const output = await response.json();
                                            if (output === true) {
                                                setConfirmed(false)
                                            }
                                            console.log(output)
                                        }; endBet();
                                    } 
                                }  
                                >Request With Other Method</Button> 
                            </div>
                            :
                            <p>Bet Completed.</p>}
                            </li>
                            </div>
                            </ul>)})}
                            
                {activeOppBets.map(
                    (bet) => {
                    return (<ul class="collection">
                            <li class="collection-item">{bet[10]}: {bet[9].slice(0, 15)}</li>
                            <div class="betinfo">
                            <li>With: {bet[2]}</li>
                            <li>{bet[6]}: {bet[7]}</li>
                            <li>Risking: ${bet[3]}</li>
                            <li>To Win: ${bet[4]}</li>
                            </div><br></br>
                            <div class="betinfo">
                            <li>
                            {confirmed ?
                            <div>
                            <Button
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        const pay = async () => {
                                            const data = {
                                                username: bet[2],
                                                description: bet[10],
                                                amount: bet[4],
                                                auth_token: auth_token,
                                                result: 'Payed'
                                            }
                                            const configs= {
                                                method: "POST",
                                                headers: {'Content-Type': 'application/json'},
                                                mode: "cors",
                                                body: JSON.stringify(data)
                                            }
                                            const response = await fetch("http://localhost:5000/pay_user", configs);
                                            const output = await response.json();
                                            if (output === true) {
                                                setConfirmed(false)
                                            }
                                            console.log(output)
                                        }; pay();
                                    } 
                                }  
                            >Pay with Venmo</Button>
                            <Button
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        const request = async () => {
                                            const data = {
                                                username: bet[2],
                                                description: bet[10],
                                                amount: bet[4],
                                                auth_token: auth_token,
                                                result: 'Requested'
                                            }
                                            const configs= {
                                                method: "POST",
                                                headers: {'Content-Type': 'application/json'},
                                                mode: "cors",
                                                body: JSON.stringify(data)
                                            }
                                            const response = await fetch("http://localhost:5000/request_user", configs);
                                            const output = await response.json();
                                            if (output === true) {
                                                setConfirmed(false)
                                            }
                                            console.log(output)
                                        }; request();
                                    } 
                                }  
                            >Request with Venmo</Button>
                            <Button
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        const endBet = async () => {
                                            const data = {
                                                auth_token: auth_token,
                                                bet_pk: bet[0],
                                                priv: bet[1],
                                                betCreator: bet[2],
                                                amountUserAtRisk: bet[3],
                                                amountUserWin: bet[4],
                                                betUser: bet[5],
                                                typeOfBet: bet[6],
                                                line: bet[7],
                                                odds: bet[8],
                                                betDate: bet[9],
                                                betDescription: bet[10],
                                                amountAtRisk: bet[11],
                                                amountWin: bet[12],
                                                friend_pk: bet[13],
                                                user_pk: bet[14],
                                                result: 'Payed'
                                            }
                                            const configs= {
                                                method: "POST",
                                                headers: {'Content-Type': 'application/json'},
                                                mode: "cors",
                                                body: JSON.stringify(data)
                                            }
                                            const response = await fetch("http://localhost:5000/end_bet", configs);
                                            const output = await response.json();
                                            if (output === true) {
                                                setConfirmed(false)
                                            }
                                            console.log(output)
                                        }; endBet();
                                    } 
                                }  
                            >Pay With Other Method</Button>
                            <Button
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        const endBet = async () => {
                                            const data = {
                                                auth_token: auth_token,
                                                bet_pk: bet[0],
                                                priv: bet[1],
                                                betCreator: bet[2],
                                                amountUserAtRisk: bet[3],
                                                amountUserWin: bet[4],
                                                betUser: bet[5],
                                                typeOfBet: bet[6],
                                                line: bet[7],
                                                odds: bet[8],
                                                betDate: bet[9],
                                                betDescription: bet[10],
                                                amountAtRisk: bet[11],
                                                amountWin: bet[12],
                                                friend_pk: bet[13],
                                                user_pk: bet[14],
                                                result: 'Requested'
                                            }
                                            const configs= {
                                                method: "POST",
                                                headers: {'Content-Type': 'application/json'},
                                                mode: "cors",
                                                body: JSON.stringify(data)
                                            }
                                            const response = await fetch("http://localhost:5000/end_bet", configs);
                                            const output = await response.json();
                                            if (output === true) {
                                                setConfirmed(false)
                                            }
                                            console.log(output)
                                        }; endBet();
                                    } 
                                }  
                            >Request With Other Method</Button>
                            </div>
                            :
                            <p>Bet Completed.</p>}
                            </li>
                            </div>
                            </ul>)})}
                        


            </div>
            {/* <input onChange={e => setVenUsername()}></input>
            <input onChange={e => setVenPassword()}></input>
            <Button
                onClick={
                    e => {
                    e.preventDefault();
                    const venmo = async () => {
                        const data = {
                            venmo_username: venUsername,
                            venmo_password: venPassword
                        }
                        const configs= {
                            method: "POST",
                            headers: {'Content-Type': 'application/json'},
                            mode: "cors",
                            body: JSON.stringify(data)
                            }
                            const response = await fetch("http://localhost:5000/request_with_venmo", configs);
                            const output = await response.json();
                            console.log(output)
                    }
                    venmo();
                }}
                >Request</Button> */}
        </div>
    )}