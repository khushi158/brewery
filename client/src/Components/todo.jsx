import React from 'react'
import '../App.css'



const Todo = ({element,setMessage}) => {
  
  
  async function handleUpdate(id,status){
    console.log("clicked");
    const res=await fetch(`${process.env.REACT_APP_API_URL}/api/todos/${id}`,{
      method:"PUT",
      boyd:JSON.stringify({status:status}),
      headers:{
        "Content-Type": "application/json"
      },
    })
    const json=await res.json();
    if(json.acknowledged){
      setMessage(currTodos=>{
        return currTodos.map((currTodo)=>{
          if(currTodo._id===id){
            return {...currTodo,status:!currTodo.status};
          }
          return currTodo;
        })
      })
    }
  }

  return (
    <div className='todoHolder'>
          
          <li>{element.todo}</li>
          <button onClick={()=>handleUpdate(element._id,element.status)}>
            {(element.status)? "✅" : "🔲"}
          </button>
          <button>
            delete
          </button>
        </div>
  )
}
export default Todo;