import React, { useContext, useState } from 'react'
import { Container,TextField ,Button} from '@mui/material';
import '../Assets/Signupform.css'
import { supabase } from './app';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router';
import { AuthContext, useAuth } from '../../Contexts/Authcontext';
import img1 from '../Assets/Images/pizza 1.svg'

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}


const Login = () => {
  const[gotdata,setData]=useState({Email:'',Password:''});
  const[loading,setLoading]=useState(false);
  const[messageSnack,setMessageSnack]=useState('');

  const [open, setOpen] = React.useState(false);
 
  const navigator=useNavigate();


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

  const { isAuthenticated, login,setUserData} = useAuth();


  function handleChange(event){
    setData({...gotdata,[event.target.name]:event.target.value});
  }



  async function postDataToSupabase(){
    try{
                
          const { data, error } = await supabase.auth.signInWithPassword({
            email: gotdata.Email,
            password: gotdata.Password,
          })
      console.log(data);
      if(data && data.user && data.user.role==="authenticated"){
        setLoading(false);
          console.log("submitted 😃");
          setMessageSnack('Signed In successfully! ✅ ');
         setUserData(data.user.email);
          handleSnackClick();
          setTimeout(() => {
            navigator('/');
            login();
          }, 1000);
      }
      if(error){
        setLoading(false);

        setMessageSnack("check details and try again☠️");
        handleSnackClick();
        console.log(error);

      }
    }
    catch(err){
      console.log(err);
      setLoading(false);
    }
  }



  function handleClick(){
    setLoading(true);
    console.log(gotdata);
    postDataToSupabase();
  }





  return (
    <div className='signup-form'>
     
      <Container maxWidth="sm" >
   
        <div className='signup-form1'>
        <img className='myfavimg' src={img1} height="200" width="200" alt="" />
          <h2>LOG-IN</h2>

        <TextField onChange={handleChange} name='Email' required id="outlined-basic" label="Email" variant="outlined" />
        <TextField onChange={handleChange} name='Password' required id="outlined-basic" label="Password" variant="outlined" />
        {(gotdata.Email==='' && gotdata.Password==='') ?<Button disabled>SignIn</Button> :<Button className='signup-form1-inp-btn' onClick={handleClick} color='secondary' variant="contained">Login</Button>}
        <Button color='secondary'  onClick={()=>{navigator('/signup')}}  >Don't have an account make one!</Button>
        <Button color='secondary'  onClick={()=>navigator('/otpsignin')}  >Sign IN with OTP</Button>
        
        </div>
      </Container>
      {loading && <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={()=>setLoading(false)}
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
  )
}

export default Login;