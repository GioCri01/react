import { useEffect, useState } from 'react'

import './App.css'

interface Todo{
  id:number
  descrizione:string,
  completed: false
}

function App() {

  const [todo,setTodo]=useState<Todo[]>();
  const [descrizione,setDescrizione] = useState("");
  const [active, setActive] = useState<boolean>()
  const [loading,setLoading]= useState<boolean>()

    useEffect(() => {
      fetch('http://localhost:8000/todo')
      .then(response => response.json())
      .then(data => setTodo(data))
      .catch(error => console.error(error));
      
    }, [todo]);

    
    
   function add() {
    
    setLoading(false)
    setTimeout(()=>{
      
      fetch('http://localhost:8000/todo',{
        method:'POST',
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({descrizione}),
      })
  
        setDescrizione("")
        setLoading(true)
    }, 2000);
    

    
   
    
   }

   function deleteTodo(id : number) {
      fetch('http://localhost:8000/todo/'+id,{
        method:"DELETE"
      })

      
      
   }

   function taskCompleta(id:number) {
    setActive(true)
    fetch('http://localhost:8000/todo/'+id,{
      method:'PATCH',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({completed:active}),
    })
    
   }


   if (loading== false) {
    return(
      <div className="App ">
        <div  className="header">
          <h2 >My To Do List</h2>
          <input type="text" value={descrizione}  placeholder="Title..." onChange={(e)=>setDescrizione(e.target.value)}/>
          <span className="addBtn" onClick={()=>add()}>Add</span>
          
        </div> 
        <div className="lds-spinner "><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

          <ul>
            {todo && todo.map((item,i) =>(
              <li 
              
              className={`d-flex justify-content-between ${todo[i].completed ?'completato':''}` }  key={i}>{item.descrizione} 
              <div>
                <button className='btn btn-danger mx-2' onClick={()=>deleteTodo(item.id)}>elimina</button>
                <button className='btn btn-success' onClick={()=>taskCompleta(item.id)}>todo completato</button>
              </div>
              
              </li>
            ))}
          </ul>
          
        
      </div>
      
    
    )
  }
   
    
  return (
    <div className="App">
        <div  className="header">
          <h2 >My To Do List</h2>
          <input type="text" value={descrizione}  placeholder="Title..." onChange={(e)=>setDescrizione(e.target.value)}/>
          <span className="addBtn" onClick={()=>add()}>Add</span>
          
        </div> 


          <ul>
            {todo && todo.map((item,i) =>(
              <li 
              
              className={`d-flex justify-content-between ${todo[i].completed != null?'completato':''}` }  key={i}>{item.descrizione} 
              <div>
                <button className='btn btn-danger mx-2' onClick={()=>deleteTodo(item.id)}>elimina</button>
                <button className='btn btn-success' onClick={()=>taskCompleta(item.id)}>todo completato</button>
              </div>
              
              </li>
            ))}
          </ul>
        
        
    </div>
  )
}

export default App
