import { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export function SidebarProvider({children}){

    //const [showSidebar,setShowSidebar] = useState(false);
    const [currentTask,setCurrentTask] = useState(null);

    const toggleSidebar = (task_id)=>{
        console.log("task id: ",task_id);
        setCurrentTask((prev)=>{
            if (prev!=task_id)
                return task_id;
            return null;

        });
        //setShowSidebar(true);
        console.log(task_id);
    }

    return(
        <SidebarContext.Provider value={{currentTask,setCurrentTask,toggleSidebar}}>
            {children}
        </SidebarContext.Provider>
    )

}

export function useSidebar(){
    return useContext(SidebarContext);
}
