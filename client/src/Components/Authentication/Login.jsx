import React, { useContext, useState } from 'react';
import { Container, TextField, Button } from '@mui/material';
import '../Assets/Signupform.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router';
import { AuthContext, useAuth } from '../../Contexts/Authcontext';
import img1 from '../Assets/Images/pizza 1.svg';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

const Login = () => {
  const [gotdata, setData] = useState({ Email: '', Password: '' });
  const [loading, setLoading] = useState(false);
  const [messageSnack, setMessageSnack] = useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { login, setUserData } = useAuth();

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
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  function handleChange(event) {
    setData({ ...gotdata, [event.target.name]: event.target.value });
  }

  async function postDataToCustomAPI() {
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
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
        console.log('Logged in successfully!', result);
        setMessageSnack('Signed In successfully! ✅');
        
        handleSnackClick();
        setTimeout(() => {
          navigate('/');
          login();
        }, 1000);
      } else {
        setLoading(false);
        setMessageSnack(result.message || 'Login failed, check your details ☠️');
        handleSnackClick();
        console.log(result);
      }
    } catch (err) {
      setLoading(false);
      console.log('Error:', err);
      setMessageSnack('Something went wrong, please try again ☠️');
      handleSnackClick();
    }
  }

  function handleClick() {
    setLoading(true);
    postDataToCustomAPI();
  }

  return (
    <div className="signup-form">
      <Container maxWidth="sm">
        <div className="signup-form1">
          <img className="myfavimg" src={img1} height="200" width="200" alt="" />
          <h2>LOG-IN</h2>
          <TextField onChange={handleChange} name="Email" required label="Email" variant="outlined" />
          <TextField onChange={handleChange} name="Password" required label="Password" variant="outlined" />
          {(gotdata.Email === '' && gotdata.Password === '') ? (
            <Button disabled>SignIn</Button>
          ) : (
            <Button className="signup-form1-inp-btn" onClick={handleClick} color="secondary" variant="contained">
              Login
            </Button>
          )}
          <Button color="secondary" onClick={() => navigate('/signup')}>Don't have an account? Sign up!</Button>
          <Button color="secondary" onClick={() => navigate('/otpsignin')}>Sign In with OTP</Button>
        </div>
      </Container>
      {loading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
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
};

export default Login;
