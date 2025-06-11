import { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export function TaskProvider({children}){

    const [tasks,setTasks] = useState([]);    

    const addAllTasks = (tasks)=>{
        setTasks(tasks);
        localStorage.setItem('taskList',JSON.stringify(tasks));
    }

    const addTask = async (title) =>{
        try{
            const token = localStorage.getItem('token');
            const res = await fetch('/api/tasks',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({title:title,completed:false})
            });
            const data = await res.json();
            if (res.status==201){
                console.log(data);
                //addTask(data._id,data.title); //add to state
                setTasks((prev)=>{
                    const updated = [
                        ...prev,{
                            _id: data._id,
                            title: title,
                            description: "",
                            completed:false,
                            due_date: ""
                        }
                    ]
                    localStorage.setItem('taskList',JSON.stringify(updated));
                    return updated;
                });
                console.log(tasks);
            }
            else{
                console.log(data.message);
            }
        }catch(err){
            console.error("Network or server error:", err.message);
        }

    };

    const editTask = async(task_id,newTitle,newDescription,newDate) =>{
        try{
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/tasks/${task_id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({title:newTitle,description:newDescription,due_date:newDate})               
            });
            const data = await res.json();
            console.log(data.message);
            setTasks((prev) => {
                const updated = prev.map((t)=>
                    t._id === task_id ? {...t, title : newTitle, description: newDescription, due_date: newDate} : t
                );
                localStorage.setItem('taskList',JSON.stringify(updated));
                console.log(tasks);
                return updated;
            });
        } catch(err){
            console.log(err.message);
        }

    };

    const deleteTask = async (task_id) =>{
        try{
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/tasks/${task_id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            const data = await res.json();
            console.log(data.message);
            //deleteTask(id);
            setTasks((prev)=> {
                const updated = prev.filter(t=> t._id !== task_id);
                localStorage.setItem('taskList',JSON.stringify(updated));
                console.log(tasks);
                return updated;
            });
        } catch(err){
            console.log(err.message);
        }
    };

    const toggleStatus = async(task_id) => {
        try{
            const token = localStorage.getItem('token');
            console.log("task id",task_id);
            const res = await fetch(`/api/tasks/${task_id}/toggle`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }
            });
            const data = await res.json();
            console.log(data.message);
            setTasks((prev) => {
                const updatedTasks = prev.map((t) =>
                    t._id === task_id ? { ...t, completed: !t.completed } : t
                );
                localStorage.setItem('taskList', JSON.stringify(updatedTasks));
                console.log("Toggled:", updatedTasks);
                return updatedTasks;
            });
        } catch(err){
            console.log(err.message);
        }

    };

    const checkOverdue = (task_id) =>{
        const task = tasks.find(t=> t._id === task_id);
        if (!task) return false;
        return (task.due_date>new Date());
    }


    return (
        <TaskContext.Provider value={{tasks,addAllTasks,addTask,editTask,deleteTask,toggleStatus,checkOverdue}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks(){
    return useContext(TaskContext);
}