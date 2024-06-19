import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

export default function SwitchesGroup({state,setState}) {
 

  const handleChange = (event) => {
    setState({
        Name: false ,Type:false ,city: false,
      [event.target.name]: event.target.checked
    });
  };

  return (
    <FormControl component="fieldset" variant="standard" >
      <FormLabel component="legend">Search By Convinience</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={state.Name} onChange={handleChange} name="Name" />
          }
          label="Name"
        />
        <FormControlLabel
          control={
            <Switch checked={state.Type} onChange={handleChange} name="Type" />
          }
          label="Type "
        />
        <FormControlLabel
          control={
            <Switch checked={state.City} onChange={handleChange} name="City" />
          }
          label="City "
        />
      </FormGroup>
      <FormHelperText>{ state.City && 'City' || state.Type && 'Type' || state.Name && 'Name' }</FormHelperText>
    </FormControl>
  );
}