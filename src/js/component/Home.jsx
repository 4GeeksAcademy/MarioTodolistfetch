import React, { useEffect, useState } from "react";
import { List } from "./List";
 const user = "mario_arroyo"


  const Home = () => {
     const[tasks,setTasks] = useState([])
     const[inputValue,setInputValue] = useState("")

     useEffect(() => {
      loadTodos(user)

     },[])


     const loadTodos = (user) => {
      fetch(`https://playground.4geeks.com/todo/users/${user}`,{
      }).then((response) => response.json())
      .then((data)=> {console.log(data);
      
         setTasks(data.todos)
         
      })
      .catch(error => console.log(error))
     }
     const addTodos = (user,task) => {
      fetch(`https://playground.4geeks.com/todo/todos/${user}`,{
         method:"POST",
         body:  JSON.stringify(task),
         headers :{"content-Type":"application/json"}
      })
      .then((response)=> response.json()).then((data)=> {
         console.log(data);
         
      })
     }
     const deleteTodos = (id) => {
      fetch(`https://playground.4geeks.com/todo/todos/${id}`,{
      method : "DELETE",
     headers :{"content-Type":"application/json"}
      })
     }

     const handlerkeydown = (e) => {
      if(e.key == "Enter"){
      const newTask = { label : inputValue, is_done : false}
      setTasks([...tasks,newTask])
      setInputValue("")
      addTodos(user,newTask)
      }  
     }
     const deleteTask = (id) =>{

      const newTask = tasks.filter((task) => task.id !== id )
      deleteTodos(id)
      setTasks(newTask)
      

     }

     return (
      <div className="text-center">
         <h1>TO-DO</h1>
         <input
             type="text"
             value={inputValue} 
             onChange={ (e) => setInputValue(e.target.value)}
             onKeyDown={handlerkeydown}
             
             />
            <List values={tasks}> 
               {(task) =>{
                  return(
                     <div key={task.id}>
                        <div>{task.label}</div>
                        <button onClick={ () => deleteTask(task.id)}>delete</button>
                     </div>

                  )
               }}

            </List>
            <div>{tasks.length} items left</div>
      </div>
     )
  }
  export default Home

