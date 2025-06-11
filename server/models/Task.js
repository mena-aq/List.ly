const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false,
        maxLength: 250
    },
    completed:{
        type: Boolean,
        required: true
    },
    due_date:{
        type: Date,
        required: false
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task',taskSchema);

module.exports = Task;