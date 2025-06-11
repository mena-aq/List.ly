import React from "react"
import './TaskAdder.css'
import {useState} from 'react'
import {useTasks} from '../context/TaskContext'
import Icons from '../utils/icons'

export default function TaskAdder(){

    const { tasks, addTask, editTask } = useTasks();
    const [title, setTitle] = useState("");

    const handleNewTask = async()=>{
        addTask(title);
        setTitle("");
    }

    return(
         <div className='task-input'>
            <input id='new-task-input' type='text' value={title}  onChange={(e) => setTitle(e.target.value)}></input>
            <button className='add-btn' onClick={()=>handleNewTask()}><Icons.Plus /></button>
        </div>
    )
}