import './App.css';
import {useEffect, useState} from "react";
import Todocard from './components/Todocard/Todocard';

function App() {
  const [todos, settodos] = useState([]);
const [todo,settodo] = useState({
  id:null,
  name: '',
  description: '',
  status:'Not Completed'
})

const [filteredTodos, setFilteredTodos] = useState([]);

  const [filterBy, setFilterBy] = useState("ALL");


const handleform  = (value) => {
  settodo((todo) => {
    let tododata = {...value, id: todos.length+1}
    return{ ...todo, ...tododata }
  })

}

const addtodo = (e) => {
  e.preventDefault();
  if(todo.name && todo.description){
    settodos((todos) => {
      return [...todos, todo]
    
    })
  }
  settodo({
    id: null,
    name: '',
  description: '',
  status:'Not Completed'
  })
 
}
const edittodo = (editpayload) => {
  console.log("Edit in parent", editpayload)
  settodos((todo_list) => todo_list.map((todoitem) => {
    if(todoitem.id === editpayload.id ){
      return{
        ...todoitem,...editpayload
      }
    }
    return todoitem;

  })
)};
const deletetodo = (deletepayload) => {
  console.log('Delete payload', deletepayload);
  settodos((todo_list) => todo_list.filter((todoitem)=>{
    return todoitem.id !== deletepayload.id
    }))


};
useEffect(() => {
  setFilteredTodos(todos);
}, []);


useEffect(() => {
  if (filterBy !== "ALL") {
    let filtered = todos.filter((item) => item.status === filterBy);
    setFilteredTodos(filtered);
  } else {
    setFilteredTodos(todos);
  }
  console.log("Filter By: ", filterBy);
}, [filterBy, todos]);

  return (
    <div className="App">
      <h3>My Todo</h3>
      <div>
        <form onSubmit={addtodo}>
          <div>
          <input placeholder="Todo Name" value={todo.name} onChange={(e) => handleform({name: e.target.value})} />
          <input placeholder="Todo Description" value={todo.description} onChange={(e) => handleform({description: e.target.value})} />
          <button className="add" type='submit'>Add Todo</button>
          </div>
          <div className='statusfilter'>
            <h4>Status Filter:
        <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value={"ALL"}>All</option>
          <option value={"Completed"}>Completed</option>
          <option value={"Not Completed"}>Not Completed</option>
        </select>
        </h4>
      </div>
          <div className='todo-container'>
            {filteredTodos.length ?( filteredTodos.map((item,index) => <Todocard edittodo={edittodo} deletetodo={deletetodo} todo={item} key={index} />  ) ) :
            ( <div>No todo available..</div>)}

          </div>
         
        </form>
      </div>
      
     
      
    </div>
  );
}

export default App;
