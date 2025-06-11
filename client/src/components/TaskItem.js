import React from 'react'
//import './TaskList.css'
import {useState} from 'react'
import {useTasks} from '../context/TaskContext'
import {useSidebar} from '../context/SidebarContext'
import Icons from '../utils/icons'

export default function TaskItem({id,title,description,completed,date}){

    const { editTask, deleteTask, toggleStatus, checkOverdue } = useTasks();
    const [editedTitle,setEditedTitle] = useState("");
    const [editFlag,setEditFlag] = useState(false);

    const {toggleSidebar, currentTask} = useSidebar();

    const handleTaskEdit = (e)=>{
        e.stopPropagation();
        setEditFlag(true);
        setEditedTitle(title);
        console.log(editedTitle);
    }
    const handleEditSubmit = (e)=>{
        if (e.key == 'Enter'){
            console.log(editedTitle);
            editTask(id,editedTitle,description,date);
            setEditedTitle("");
            setEditFlag(false);
        }
    }

    const toggleTaskCompletion = (id)=>{
        //e.stopPropagation();
        toggleStatus(id);
    }

    const handleTaskDelete = async(e,id)=>{
        e.stopPropagation();
        deleteTask(id);
        /*
        try{
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5050/api/tasks/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            const data = await res.json();
            console.log(data.message);
            deleteTask(id);
        } catch(err){
            console.log(err.message);
        }
        */
    }

    const showSidebar = (id)=>{
        if (!editFlag)
            toggleSidebar(id);
    }

    return(
        <li className='list-item' onClick={()=> showSidebar(id)}>
            <div>
                <input 
                    type='checkbox' 
                    checked={completed}
                    onClick={(e)=> e.stopPropagation()}
                    onChange={()=> toggleTaskCompletion(id)}
                />
                {!editFlag && 
                    <span className={`${completed? 'completed-task':''} ${checkOverdue(id)? 'red-text':''}`}>
                        {title}
                    </span>
                }
                {editFlag && 
                    <input
                        type='text' value={editedTitle}
                        onChange={(e)=> setEditedTitle(e.target.value)}
                        onKeyDown={(e)=> handleEditSubmit(e)} 
                        className='edit-input'>
                    </input>
                }
            </div>
            <div className='task-btn-panel'>
                <button onClick={(e)=> handleTaskEdit(e)} disabled={currentTask? true:false}><Icons.EditIcon /></button>
                <button onClick={(e)=> handleTaskDelete(e,id)} disabled={currentTask? true:false}><Icons.Trash /></button>
            </div>
        </li>
    )

}