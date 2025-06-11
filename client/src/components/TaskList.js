import React from "react"
import './TaskList.css'
import { useState,useEffect } from 'react'
import {useTasks} from '../context/TaskContext'
import TaskItem from './TaskItem'

export default function TaskList({viewCompleted}){

    const { tasks, addAllTasks } = useTasks();

    //get all tasks
    useEffect(()=>{
        const fetchTasks = async()=>{
            const taskList = localStorage.getItem('taskList');
            if (taskList){
                //load from local storage
                addAllTasks(JSON.parse(taskList));
            }
            else{
                //load from db
                const token = localStorage.getItem('token');
                try{
                    const res = await fetch('http://localhost:5050/api/tasks',{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        }
                    });
                    const data = await res.json();
                    if (res.status == 200){
                        console.log("data fetched",data);
                        addAllTasks(data);
                    }
                } catch(err){
                    console.error(err.message);
                }
            }
        }
        fetchTasks();
    },[]);


    const taskElements = tasks

        .filter(task=> viewCompleted || !task.completed)
        .map((task)=>(
        <TaskItem
            key={task._id}
            id={task._id}
            title={task.title}
            description={task.description}
            completed={task.completed}
            date={task.due_date}
        />))

    return (
        <ul className="task-list">
            {taskElements}
        </ul>
    )


}