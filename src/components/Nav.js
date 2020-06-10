import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FindFriends from './FindFriends'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        fullWidth={true}
      >
        <Tab label="User" disabled={true} {...a11yProps(0)} />
        <Tab label="Home" default={true} {...a11yProps(1)} />
        <Tab label="Public Bets" disabled={true} {...a11yProps(2)} />
        <Tab label="Make a Bet" {...a11yProps(3)} />
        <Tab label="Active Bets" {...a11yProps(4)} />
        <Tab label="History" {...a11yProps(5)} />
        <Tab label="Find a Friend" {...a11yProps(6)} />
        <Tab label="Profile" {...a11yProps(7)} />
        <Tab label="Settings" {...a11yProps(8)} />
      </Tabs>
      <TabPanel default={true} value={value} index={1}>
        Home
      </TabPanel>
      <TabPanel default={true} value={value} index={2}>
        Public Bets
      </TabPanel>
      <TabPanel value={value} index={3}>
        Make a Bet
      </TabPanel>
      <TabPanel value={value} index={4}>
        Active Bets
      </TabPanel>
      <TabPanel default={true} value={value} index={5}>
        History
      </TabPanel>
      <TabPanel value={value} index={6}>
        Find a Friend <br></br><br></br><br></br>
        <FindFriends />
      </TabPanel>
      <TabPanel value={value} index={7}>
        Profile
      </TabPanel>
      <TabPanel value={value} index={8}>
        Settings
      </TabPanel>
    </div>
  );
}