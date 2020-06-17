import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [newValue, setNewValue] = React.useState('female');
   
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
    <div>
        <h4>Select a User</h4>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <br></br><br></br>

      <FormControl component="fieldset">
        <FormLabel component="legend">Tpye</FormLabel>
        <RadioGroup aria-label="bet" name="bet1" value={newValue} onChange={handleChange}>
          <FormControlLabel value="straight" control={<Radio />} label="Straight" />
          <FormControlLabel value="spread" control={<Radio />} label="Spread" />
          <FormControlLabel value="over / under" control={<Radio />} label="Over / Under" />
          {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
        </RadioGroup>
      </FormControl>
 
     
    </div>
    </Container>
  );
}