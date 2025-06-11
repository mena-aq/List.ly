const Task = require('../models/Task');

//GET /api/tasks
exports.getTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({user_id:req.userId}).exec();
        return res.status(200).json(tasks);
    } catch(err){
        console.error(err);
        res.status(500).json({message:'Server Error'});        
    }
}

//POST /api/tasks
exports.createNewTask = async(req,res)=>{
    try{
        const {title,completed} = req.body;
        const user_id = req.userId;
        const newTask = Task({
            title:title,
            description:'',
            completed:completed,
            due_date:'',
            user_id:user_id
        }); 
        await newTask.save();

        res.status(201).json(newTask);
    } catch(err){
        console.error(err);
        res.status(500).json({message:'Server Error'});
    }
}

//PUT /api/tasks/:id 
exports.updateTask = async(req,res)=>{
    try{
        const {title,description,due_date} = req.body;
        const task_id =req.params.id;
        const taskToUpdate = await Task.findById(task_id);

        if (!taskToUpdate) return res.status(404).json({message:'Record not found'});

        taskToUpdate.title = title;
        taskToUpdate.description = description;
        taskToUpdate.due_date = due_date;
        await taskToUpdate.save();

        res.status(200).json({message:'Updated successfully'});
    } catch(err){
        console.error(err);
        res.status(500).json({message:'Server Error'});
    }
}

//DELETE /api/tasks/:id
exports.deleteTask = async(req,res)=>{
    try{
        const task_id = req.params.id;
        await Task.deleteOne({_id:task_id});

        res.status(202).json({message:'Deleted Successfully'});
    } catch(err){
        console.error(err);
        res.status(500).json({message:'Server Error'});        
    }
}

//PATCH /api/tasks/:id/toggle
exports.toggleTask = async(req,res)=>{
    try{
        const task_id = req.params.id;
        console.log(task_id);
        const taskToToggle = await Task.findById(task_id);

        if (!taskToToggle) return res.status(404).json({message:'Record not found'});

        taskToToggle.completed = !taskToToggle.completed;
        await taskToToggle.save();

        res.status(200).json({message:'Toggled successfully'});

    } catch(err){
        console.error(err);
        res.status(500).json({message:'Server Error'});         
    }
}