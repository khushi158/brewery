import './App.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from './Components/todo';
import { MainTodo } from './Components/MainTodo';
import  HomePage  from './Components/Brewries/HomePage';
import {Routes,Route} from 'react-router-dom'
import Individual from './Components/Brewries/Individual';

import Signup from './Components/Authentication/Signup';
import {AuthContext} from './Contexts/Authcontext';
import Login from './Components/Authentication/Login';
import getUser from './Contexts/userData';
import NavBar from './Components/NavBar/NavBar';
import OtpSign from './Components/Authentication/OtpSign';





function App() {

  const {isAuthenticated}=useContext(AuthContext);
  const [data, setData] = useState({});
 
console.log(process.env);

  return (
    <main className="App">
      
      {isAuthenticated && <NavBar />}
    <Routes>
  
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/info" element={<Individual/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/otpsignin" element={<OtpSign/>}></Route>
    </Routes>


    
    </main>
  );
}

export default App;
