const express = require('express');
const router = express.Router();

//controller functions
const {createNewTask,getTasks,deleteTask,updateTask,toggleTask} = require('../controllers/taskController');

//middleware
const auth = require('../middleware/authMiddleware');

//routes
router.get('/',auth,getTasks);
router.post('/',auth,createNewTask);
router.delete('/:id',auth,deleteTask);
router.put('/:id',auth,updateTask);
router.patch('/:id/toggle',auth,toggleTask);

module.exports = router;