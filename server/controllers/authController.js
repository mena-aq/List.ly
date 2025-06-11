const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//POST /api/auth/register
exports.registerUser = async(req,res)=>{
    try{
        const {username,password,email} = req.body;

        //check if alr has account
        const existingUser = await User.findOne({username});
        if (existingUser) return res.status(400).json({message:'User already exists!'});

        //else register
        //hash password 
        const hashedPwd = await bcrypt.hash(password,10);
        //save
        const newUser = new User({username:username,password:hashedPwd,email:email});
        await newUser.save();

        res.status(201).json({message:'User registered succesfully'});

    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server Error'});
    }
};

// POST /api/auth/login
exports.loginUser = async(req,res)=>{
    try{
        const {username,password} = req.body;

        //check credentials
        const user = await User.findOne({username});
        if (!user) return res.status(400).json({message:'User not found!'});

        const passwordMatch = await bcrypt.compare(password,user.password);
        if (!passwordMatch) return res.status(400).json({message:'Incorrect Password!'});

        //generate JWT
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h', issuer:'list.ly'});

        res.status(200).json({token});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

//GET /api/auth/profile
exports.getAccountInfo = async(req,res)=>{
    try{
        const user = await User.findById(req.userId).select('-password');
        if (!user)  return res.status(404).json({ message: 'User not found' });
        res.json(user);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server Error' });        
    }
}