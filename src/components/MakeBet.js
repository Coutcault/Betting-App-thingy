import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button, ButtonToolbar, ButtonGroup, InputGroup, Modal } from 'react-bootstrap';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function Ticket() {
  const classes = useStyles();
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [betUser, setBetUser] = useState(""); //User to make bet with
  const [how, setHow] = useState("Private");
  const [type, setType] = useState("");
  const [line, setLine] = useState(Number);
  const [odds, setOdds] = useState(Number);
  const [betDuration, setBetDuration] = useState(Number);
  const [betDate, setBetDate] = useState(Date);
  const [description, setDescription] = useState("");
  const [amountRisk, setAmountRisk] = useState(Number);
  // const [lineSwith, setLineSwitch] = useState("off");
  // const [oddsSwith, setOddsSwitch] = useState("");
  const [userFriends, setUserFriends] = useState([])
  const ticket = [how, betUser, type, line, odds, betDuration, betDate, description, amountRisk]

  const useStateWithSessionStorage = (key) => {
    const [data, setData] = useState(sessionStorage.getItem('token') || "");
    // console.log(data)
    return data
    }
  const auth_token = useStateWithSessionStorage()
  
  
    useEffect(() => {
      const getFriends = async () => {
          const data = {
           auth_token: auth_token
          }
          const configs= {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            mode: "cors",
            body: JSON.stringify(data)
            }
            const response = await fetch("http://localhost:5000/get_friends", configs);
            const output = await response.json();
            setUserFriends(output)
            // console.log(userFriends)
          }
       getFriends();
      }
    )
  
  //   useEffect(() => {
  //     const M = window.M;
  //     document.addEventListener('DOMContentLoaded', function() {
  //         const elems = document.querySelectorAll('.modal');
  //         const instances = M.Modal.init(elems, {});
  //     });
  // })

  return (
    // Public / Private
    <div className='container' >
      <div>
        <p onChange={e => setHow(e.target.name)}>
          <label>
            <input name="Public" type="radio" class="with-gap" disabled />
            <span>Public</span>
          </label>
          <label>
            <input name="Private" type="radio" class="with-gap" default/>
            <span>Private</span>
          </label>
        </p>
        <br></br>
      </div>
      
    
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={betUser}
              onChange={e => setBetUser(e.target.value)}
              label="User"
            >
              {
                userFriends.map(
                (friend) => {
                  return (<MenuItem value={friend}>{friend}</MenuItem>);
                })
              }
              {/* <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem> */}
            </Select>
        </FormControl>
        <br></br>
      </div>
      

      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={type}
              onChange={e => setType(e.target.value)}
              label="Type"
            >
              <MenuItem value={"Money Line"}>Money Line</MenuItem>
              <MenuItem value={"Spread"}>Spread</MenuItem>
              <MenuItem value={"Over/Under"}>Over/Under</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
        </FormControl>
        <br></br>
      </div>

  
      <div class="Line - switch">
        {/* <label onClick={e => setLineSwitch(e.target.value)}>
          <RemoveIcon />
          <input type="checkbox"/>
          <span class="lever"></span>
          <AddIcon />
        </label> */}


        <InputGroup>
          <input
            type="number"
            placeholder="Line"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            onChange={e => setLine(e.target.value)}
          />
        </InputGroup>
      </div>
      

 
      <div class="Odds - switch">
      {/* <label onChange={e => setOddsSwitch(e.target.name)}>
          <RemoveIcon name='-'/>
          <input type="checkbox"/>
          <span class="lever"></span>
          <AddIcon name='+'/>
      </label> */}
      

        <InputGroup>
          <input
            type="number"
            min='100'
            placeholder="Odds"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            onChange={e => setOdds(e.target.value)}
          />
        </InputGroup>
      </div>
      

    
      <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea2" 
            class="materialize-textarea" 
            data-length="120"
            onChange={e => setDescription(e.target.value)}
            >
            </textarea>
            <label for="textarea2">Description</label>
          </div>
        </div>
      </form>
      </div>

      

      <div>
        <InputGroup>
          <input
            type="number"
            min='1'
            placeholder="Amount to Risk"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            onChange={e => setAmountRisk(e.target.value)}
          />
        </InputGroup>   
      </div>     



      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>



      {/* <a class="waves-effect waves-light btn modal-trigger" href="#modal1">Submit Ticket</a>

      <div id="modal1" class="modal">
        <div class="modal-content">
          <h4>Ticket Review</h4>
          <p>A bunch of text</p>
        </div>
        <div class="modal-footer">
          <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div> */}




      {/* <Button
        variant="contained"
        color="default"
        className={classes.button}
        // startIcon={<PersonAddIcon />}
        onClick={
          e => {
            e.preventDefault();
            console.log(ticket)
          }
        }
      >
        Submit Ticket
    </Button> */}


    </div>
  )


}