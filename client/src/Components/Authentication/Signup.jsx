import React, { useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import '../Assets/Signupform.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router';
import img1 from '../Assets/Images/burger 1.svg';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

const Signup = () => {
  const [gotdata, setData] = useState({ Email: '', Password: '' });
  const [loading, setLoading] = useState(false);
  const [messageSnack, setMessageSnack] = useState('');
  const [open, setOpen] = React.useState(false);
  const navigator = useNavigate();

  const handleSnackClick = () => {
    setOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleSnackClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function handleChange(event) {
    setData({ ...gotdata, [event.target.name]: event.target.value });
  }

  async function postDataToApi() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: gotdata.Email,
          password: gotdata.Password,
        }),
      });
      const result = await response.json();

      if (response.ok) {
        setLoading(false);
        console.log('submitted 😃');
        setMessageSnack('Signed up successfully! ✅ ');
        handleSnackClick();
        setTimeout(() => {
          navigator('/login');
        }, 1000);
      } else {
        setLoading(false);
        setMessageSnack(result.message || 'Check details and try again ☠️');
        handleSnackClick();
        console.log(result);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessageSnack('Internal server error ☠️');
      handleSnackClick();
    }
  }

  function handleClick() {
    setLoading(true);
    console.log(gotdata);
    postDataToApi();
  }

  return (
    <div className='signup-form'>
      <Container maxWidth="sm">
        <div className='signup-form1'>
          <img className='myfavimg' src={img1} height="200" width="200" alt="" />
          <h2>SignUp</h2>
          <TextField onChange={handleChange} name='Email' required id="outlined-basic" label="Email" variant="outlined" />
          <TextField onChange={handleChange} name='Password' required id="outlined-basic" label="Password" variant="outlined" />
          {(gotdata.Email === '' && gotdata.Password === '') ? 
            <Button disabled>SignUP</Button> : 
            <Button className='signup-form1-inp-btn' onClick={handleClick} color='secondary' variant="contained">SignUp!</Button>
          }
          <Button color='secondary' onClick={() => { navigator('/login') }}>Already have an account? Sign in!</Button>
        </div>
      </Container>
      
      {loading && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>}

      <Snackbar
        open={open}
        TransitionComponent={TransitionRight}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message={messageSnack}
        action={action}
      />
    </div>
  );
}

export default Signup;
