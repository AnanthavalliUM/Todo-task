import { useEffect, useState } from "react"
import './todocard.css';

const Todocard = (props) => {
    const { todo, edittodo, deletetodo } = props
    const [status, setstatus] = useState('')

    useEffect(() => {
        setstatus(todo.status);
    },[] ); 

    useEffect(() => {
  console.log("Todo", todo.name);
  console.log("status", status);
    }, [status]);

    const handleedit = () => {
    const editpayload = {...todo, status:status}
    edittodo(editpayload)
    }

    const handledelete = () => {
        const deletepayload = {...todo, status:status}
        deletetodo(deletepayload)
    }
    return(
        <div>
            <div className="container">

            <div className="card-container">

            <div className="name">Name:   {todo.name}</div>
            <div className="description">Description:  {todo.description}</div>
            <div className="status">Status:{" "}
            <select value={todo.status} onChange={(e) => setstatus(e.target.value)}>
                <option value={"Completed"}>Completed</option>
                <option vlaue={"Not Completed"}>Not Completed</option>
                </select>
                </div>
                <div className="button-ele">
                    <button className="edit" onClick={handleedit}>Edit</button>
                    <button className="delete" onClick={handledelete}>Delete</button>
                </div>

            </div>
            </div>
            
            </div>
    )
}


export default Todocard;