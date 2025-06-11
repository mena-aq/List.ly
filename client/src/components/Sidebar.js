import React from 'react'
import './Sidebar.css'
import {useTasks} from '../context/TaskContext'
import {useSidebar} from '../context/SidebarContext'
import {useState} from 'react'
import Icons from '../utils/icons'

export default function Sidebar(){

    const {tasks, editTask, checkOverdue} = useTasks();
    const {currentTask} = useSidebar();

    const task = tasks.find(t=> t._id === currentTask);

    const [editDescription,setEditDescription] = useState(false);
    const [newDescription,setNewDescription] = useState('');

    const handleDescEdit = ()=>{
        setEditDescription(true);
        setNewDescription(task.description);
        console.log(newDescription);
    }
    const handleEditDescSubmit = (e)=>{
        if (e.key == 'Enter'){
            console.log(newDescription);
            editTask(task._id,task.title,newDescription,task.due_date);
            setNewDescription("");
            setEditDescription(false);
        }
    }

    const [editDate,setEditDate] = useState(false);
    

    const handleDateEdit = (date_input)=>{
        editTask(task._id,task.title,task.description,date_input);

    }


    return (
        <div className={currentTask? "sidebar sidebar-open":"sidebar"}>
            {currentTask && 
            <div>
                <h3>{task.title}</h3>
                <span className='primary-text'>Description</span>
                <div className='horizontal-flex-top task-btn-panel'>
                    {!editDescription && <p className={task.description?"":"grey-text"}>{task.description? task.description:"no description"}</p>}
                    {editDescription && 
                        <textarea 
                            maxLength={250}
                            value={newDescription}
                            onKeyDown={(e)=> handleEditDescSubmit(e)}
                            onChange={(e)=> setNewDescription(e.target.value)}
                        >
                        </textarea>
                    }
                    <button onClick={()=> handleDescEdit()}>
                        <Icons.EditIcon/>
                    </button>
                </div>
                <span className='primary-text'>Due on</span>
                <div className='horizontal-flex-top task-btn-panel'>
                    {!editDate && <p className={task.due_date?"":"grey-text"}>{task.due_date? new Date(task.due_date).toLocaleDateString('en-GB'):"no due date"}</p>}
                    {editDate && 
                    <input 
                        type='date'
                        onChange={(e)=> handleDateEdit(e.target.value)}
                    >
                    </input>
                    }
                    <button onClick={()=> setEditDate(prev=> !prev)}>
                        <Icons.EditIcon/>
                    </button>
                </div>
                <div>
                    {checkOverdue(currentTask) && <span className='red-text'>Overdue!</span>}
                </div>
            </div>
            }
        </div>
    )
}