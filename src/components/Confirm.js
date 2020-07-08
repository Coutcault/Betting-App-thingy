import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [venEmail, setVenEmail] = useState("")
  const [venUsername, setVenUsername] = useState("")
  const [venPassword, setVenPassword] = useState("")
  const [sixdig, setSixDig] = useState(Number)
  const [affirm, setAffrim] = useState("")
  const history = useHistory();
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Pay with Venmo
        </Typography>
        <form className={classes.form} noValidate={false}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required={true}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Venmo Username"
                name="username"
                autoComplete="username"
                onChange={e => setVenUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                required={true}
                autoComplete="user"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Venmo Email"
                autoFocus
                onChange={e => setVenEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required={true}
                variant="outlined"
                fullWidth
                name="password"
                label="Venmo Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setVenPassword(e.target.value)}
              />
            </Grid>
            {venEmail && venUsername && venPassword ? 
            <div>
            <p>*Please enter the 6 digit code texted to the number associated with your account*</p>
            <br></br>
            <Grid item xs={12}>
              <TextField
                required={true}
                variant="outlined"
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => setSixDig(e.target.value)}
              /> 
              </Grid>
              </div>
              :
              <div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
            // onClick={
            //     e => {e.preventDefault();
            //         if (password !== affirm){
            //             const outPutDiv = document.getElementById("ourOutput");
            //             outPutDiv.innerHTML = "<p>* Passwords must match.</p>";
            //         } else {
            //             e.preventDefault();
            //             const getData = async () => {
            //             const data = {
            //                 first: first,
            //                 last: last,
            //                 email: email,
            //                 username: username,
            //                 password: password
            //             }
            //             const configs = {
            //                 method: "POST",
            //                 headers: {'Content-Type': 'application/json'},
            //                 mode: "cors",
            //                 body: JSON.stringify(data)
            //             }
            //             const response = await fetch("http://localhost:5000/add_user_payment", configs);
            //             const output = await response.json();
            //             if (output.success === true){
            //                 console.log(true, output)
            //                 history.push('/done')
            //             } else {
            //                 const outPutDiv = document.getElementById("ourOutput2");
            //                 outPutDiv.innerHTML = "<p>An error occured please try again.</p>";
            //             }
            //             }
            //         getData();
            //         }
            //     }  
            // }     
          >
            Next
          </Button>
              </div> }
          </Grid>
          <div id="ourOutput"></div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={
            //     e => {e.preventDefault();
            //         if (password !== affirm){
            //             const outPutDiv = document.getElementById("ourOutput");
            //             outPutDiv.innerHTML = "<p>* Passwords must match.</p>";
            //         } else {
            //             e.preventDefault();
            //             const getData = async () => {
            //             const data = {
            //                 first: first,
            //                 last: last,
            //                 email: email,
            //                 username: username,
            //                 password: password
            //             }
            //             const configs = {
            //                 method: "POST",
            //                 headers: {'Content-Type': 'application/json'},
            //                 mode: "cors",
            //                 body: JSON.stringify(data)
            //             }
            //             const response = await fetch("http://localhost:5000/add_user_payment", configs);
            //             const output = await response.json();
            //             if (output.success === true){
            //                 console.log(true, output)
            //                 history.push('/done')
            //             } else {
            //                 const outPutDiv = document.getElementById("ourOutput2");
            //                 outPutDiv.innerHTML = "<p>An error occured please try again.</p>";
            //             }
            //             }
            //         getData();
            //         }
            //     }  
            // }     
          >
            submit
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </div>
      <div id="ourOutput2"></div>
    </Container>
  );
}