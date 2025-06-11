//dotenv
require('dotenv').config();
//expressi 
const express = require('express');
const app = express();
//cors
const cors = require('cors');
//db
const connectDB = require('./config/db'); 


//middleware
const path = require('path');
app.use(express.static(path.join(__dirname,'..', 'client','public')));
app.use(express.json());
app.use(cors());

//routes
const authRoutes = require('./routes/authRoutes');
app.use("/api/auth",authRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks',taskRoutes);

const PORT = process.env.PORT || 5050;

//connect to db and start server
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    })
})
