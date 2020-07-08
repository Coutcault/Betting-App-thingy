import React, {useState} from 'react';
import {Link, Route, BrowserRouter, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FindFriends from './FindFriends'
import MakeBet from './MakeBet'
import History from './History'
import Profile from './Profile'
import PendingBets from './PendingBets'
import ActiveBets from './ActiveBets'

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 1000,
    // width: 1000
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  // const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const useStateWithSessionStorage = (key) => {
    const [data, setData] = useState(sessionStorage.getItem('token') || "");
    return [data, setData]
    }
  const [data, setData] = useStateWithSessionStorage("token")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div class="navbar">
        <h6>Title</h6>
        <Button 
            size="large"
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
      </div>
    <BrowserRouter>
    <div class='navlist'>
      <ul id="slide-out" class="sidenav sidenav-fixed">
        <li>
          <div class="user-view">
          <div class="background">
            {/* <img src="images/office.jpg"/> */}
          </div>
              <a href="#user"><img class="circle" src="images/yuna.jpg"/></a>
              {/* <a href="#name"><span class="white-text name">John Doe</span></a> */}
              <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
          </div>
        </li>
        <li><div class="divider"></div></li>
        <li><a>Username</a></li>
        <li><div class="divider"></div></li>
        <li><a class="waves-effect" >Home</a></li>
        <li><a class="waves-effect" >Public Bets</a></li>
        <li><Link to="/make_bet">Make a Bet</Link></li>
        <li><Link to="/pending_bets">Pending Bets</Link></li>
        <li><Link to="/active_bets">Active Bets</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/find_a_friend">Find a Friend</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <Route path="/make_bet" component={MakeBet} />
      <Route path="/pending_bets" component={PendingBets} />
      <Route path="/active_bets" component={ActiveBets} />
      <Route path="/find_a_friend" component={FindFriends} />
      <Route path="/profile" component={Profile} />
      <Route path="/history" component={History} />
      <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>
    </div>
    </BrowserRouter>
    </div>
  );
}


      // <div className={classes.root}>
    //   <Tabs
    //     orientation="vertical"
    //     // variant="scrollable"
    //     value={value}
    //     onChange={handleChange}
    //     aria-label="Vertical tabs example"
    //     className={classes.tabs}
    //     fullWidth={true}
    //   >
    //     <Tab label="Home" {...a11yProps(0)} />
    //     <Tab label="Public Bets" disabled={true} default={true} {...a11yProps(1)} />
    //     <Tab label="Make a Bet" {...a11yProps(2)} />
    //     <Tab label="Pending Bets" {...a11yProps(3)} />
    //     <Tab label="Active Bets" {...a11yProps(4)} />
    //     <Tab centered={true} label="History" {...a11yProps(5)} />
    //     <Tab label="Find a Friend" {...a11yProps(6)} />
    //     <Tab label="Profile" {...a11yProps(7)} />
        /* <Tab label="Settings" {...a11yProps(8)} /> */
    //   </Tabs>
    //   <TabPanel default={true} value={value} index={0}>
    //     Home
    //   </TabPanel>
    //   <TabPanel default={true} value={value} index={1}>
    //     Public Bets
    //   </TabPanel>
    //   <TabPanel value={value} index={2}>
    //     Make a Bet <br></br><br></br>
    //     <MakeBet />
    //   </TabPanel>
    //   <TabPanel value={value} index={3}>
    //     Pending Bets
    //     <PendingBets />
    //   </TabPanel>
    //   <TabPanel default={true} value={value} index={4}>
    //     Active Bets
    //     <ActiveBets />
    //   </TabPanel>
    //   <TabPanel value={value} index={5}>
    //     History <br></br><br></br><br></br>
    //     <History />
    //   </TabPanel>
    //   <TabPanel value={value} index={6}>
    //     Find A Friend <br></br><br></br><br></br>
    //     <FindFriends />
    //   </TabPanel>
    //   <TabPanel value={value} index={7}>
    //     Profile
    //     <Profile />
    //   </TabPanel>
    // </div>