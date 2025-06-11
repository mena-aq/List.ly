import React from 'react'
import {useState} from 'react';
import './Home.css'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import {useTasks} from '../context/TaskContext'
import TaskAdder from '../components/TaskAdder';
import TaskList from '../components/TaskList';
import Icons from '../utils/icons';
import {useSidebar} from '../context/SidebarContext'


export default function Home(){

    //const {tasks,currentTask} = useTasks();
    const [showCompleted,setShowCompleted] = useState(true);
    const {currentTask,setCurrentTask} = useSidebar();
    

    const toggleView = ()=>{
        setShowCompleted(prev=>!prev);
    }

    return(
        <div>
            <Navbar/>
            <div className='home container'>
                <div className={currentTask? 'sidebar-open task-container':'task-container'}>

                    <h1 className='task-heading'>Tasks</h1>
                    <div className='options-header'>
                        <TaskAdder/>
                        <button 
                            onClick={()=> toggleView()} 
                            className='view-btn'>
                            {showCompleted? <Icons.Eye />:<Icons.EyeSlash />}
                        </button>
                    </div>
                    <div className='card task-card m-5'>
                        <TaskList viewCompleted={showCompleted}/>
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    )
}