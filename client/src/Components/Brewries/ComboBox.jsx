import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({setText}) {
    const handleOnChange = (event, value) => {
       
        setText(value.label);
      };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={opt}
      onChange={handleOnChange}
      sx={{ width: 'sm' }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}
const opt=[
    {label:'micro'},{label:'nano'},{label:'regional'},{label:'brewpub'},{label:'large'},{label:'planning'},{label:'bar'},{label:'contract'},{label:'proprietor'},{label:'closed'},
]