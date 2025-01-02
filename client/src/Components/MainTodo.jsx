import axios from 'axios';
import React, { useEffect, useState } from 'react'
import  Todo from './todo';



export const MainTodo = () => {
    const[message,setMessage]=useState([]); 
  const[text,setText]=useState('');

  useEffect(()=>{
      async function getTodos(){
        const res=await fetch(`${process.env.VITE_API_URL}/api/todos`);
       
        const todos=await res.json();
        
        setMessage(todos);
      }
      getTodos();
  },[]);

  
    async function handleSubmit(event) {
      event.preventDefault();
    
      try {
        const res = await axios.post(`${process.env.VITE_API_URL}api/todos`, {
          todo: text,
        });
    
        console.log(res.data);
    
        const newTodo = res.data;
        setText('');
        setMessage([...message, newTodo]);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }

  

  function handleChange(event){
    setText(event.target.value);
  }

  


  return (
    <div className='App'>
        <h1>Awesome todos</h1>

            <form  onSubmit={handleSubmit}>
            <label htmlFor="">Add taks...</label>
            <input type="text" onChange={handleChange} value={text} placeholder='add task....'/>
            <button type='submit'>Add!</button>
            </form>

            {(message.length>0) && <ul>{message.map((e,i)=>(
            <Todo key={i} element={e}  setMessage={setMessage}/>
            ))}</ul>}
    </div>
  )
}
