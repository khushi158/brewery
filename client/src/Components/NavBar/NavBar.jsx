import React, { useContext } from 'react'
import './NavBar.css'
import { AuthContext, useAuth } from '../../Contexts/Authcontext';
import { useNavigate } from 'react-router';
import img1 from '../Assets/Images/fries 1.svg'
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';




const NavBar = () => {
    
    const { logout } = useAuth();
    const {setUserData}=useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const navigator=useNavigate();

    const{userData}=useContext(AuthContext);
    function handleClick(){
        console.log("loggin out"+"🫠");
        handleOpen();
        setTimeout(()=>{
            handleClose();
            logout();
            setUserData('');
            navigator('/login');
        },3000)
    }
    
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };


  return (
    <div className='nav-bar'>
        <div className='nav-b-1'>  <img src={img1} height="50" width="50" alt="" /> <h1>Hello</h1> <h5 className='useriddata'>{userData}</h5></div>
        {/* <Button onClick={handleClick} variant="contained" color="error" />logout</Button> */}
        <Button onClick={handleClick} variant="contained" color="error" >
        Logout
      </Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default NavBar;