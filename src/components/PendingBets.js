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


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));


export default function PendingBets(){
    const classes = useStyles();
    const [isBet, setIsBet] = useState(true)
    const [betAccepted, setBetAccepted] = useState(true)
    const [betDeclines, setBetDecline] = useState(true)
    const [waitingForUsersBets, seWaitingForUsersBets] = useState([])
    const [waitingForYourBets, setWaitingForYourBets] = useState([])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const useStateWithSessionStorage = (key) => {
        const [data, setData] = useState(sessionStorage.getItem('token') || "");
        // console.log(data)
        return data
        }
      const auth_token = useStateWithSessionStorage()
      
      
        useEffect(() => {
            const getPendingRB = async () => {
                const data = {
                    auth_token: auth_token
                }
                const configs= {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    mode: "cors",
                    body: JSON.stringify(data)
                }
                const response = await fetch("http://localhost:5000/get_pending_response_bet", configs);
                const output = await response.json();
                // console.log(output)
                seWaitingForUsersBets(output)
                }
            getPendingRB();

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
                    const response = await fetch("http://localhost:5000/get_pending_approval_bet", configs);
                    const output1 = await response.json();
                    setWaitingForYourBets(output1)
                }
            getPendingAB()  
          },[]  
        )


            //  const M = window.M;
            //   document.addEventListener('DOMContentLoaded', function() {
            //     var elems = document.querySelectorAll('.collapsible');
            //     var instances = M.Collapsible.init(elems, {});
    return(
        <div className='pending' >
        <div class="pendingbet">
            <div class='pendingapp'>
            <h5>Pending Your Approval</h5>
            <br></br>
            
            {waitingForYourBets.map(
                (bet) => {
                return (<ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>From: {bet[2]}  - {bet[10]} - {bet[9].slice(0, 15)}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>                               
                            <ul class="collection-item">{bet[10]} Details:<br/>
                            <br/>{bet[6]}: {bet[7]}
                            <br/>Odds: {bet[8]}
                            <br/>Risking: ${bet[11]} 
                            <br/>To Win: ${bet[12]}
                            <br/> 
                            {<a class="waves-effect waves-light btn-small" 
                                onClick={
                                    e => {
                                        e.preventDefault();
                                        const accept = async () => {
                                        const data = {
                                            // username: friend[6],
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
                                        }
                                        const configs= {
                                            method: "POST",
                                            headers: {'Content-Type': 'application/json'},
                                            mode: "cors",
                                            body: JSON.stringify(data)
                                        }
                                        const response = await fetch("http://localhost:5000/accept_bet", configs);
                                        const output = await response.json();
                                        }
                                        accept()
                                        }}
                                >Accept</a>}
                                {<a class="waves-effect waves-light btn-small"
                                    onClick={
                                        e => {
                                            e.preventDefault();
                                            const decline = async () => {
                                            const data = {
                                                bet_pk: bet[0]
                                            }
                                            const configs= {
                                                method: "POST",
                                                headers: {'Content-Type': 'application/json'},
                                                mode: "cors",
                                                body: JSON.stringify(data)
                                            }
                                            const response = await fetch("http://localhost:5000/decline_bet", configs);
                                            const output = await response.json();
                                            }
                                            decline()
                                            }}
                                >Decline</a>}
                                </ul>
                                </ExpansionPanelDetails>
                    </ExpansionPanel>)
            })}
            </div>
            <br></br>
            <div class="pendingapp">
            <h5>Pending User Response</h5>
            <br></br>

            {waitingForUsersBets.map(
                (bet) => {
                  return (<ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>With: {bet[5]}  - {bet[10]} - {bet[9].slice(0, 15)}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <ul class="collection-item">Details:<br/>
                                <br/>{bet[6]}: {bet[7]}
                                <br/>Odds: {bet[8]}
                                <br/>Risking: ${bet[11]} 
                                <br/>To Win: ${bet[12]}
                                </ul>
                                </ExpansionPanelDetails>
                    </ExpansionPanel>);
                })}
            </div>
        </div>    
        </div>
    )}

