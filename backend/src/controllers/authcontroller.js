const cloudinary  = require("../lib/cloudnary");
const generateToken = require("../lib/utils");
const User = require("../models/usermodel");
const bcrypt = require('bcryptjs')


const signup = async(req, res) => {
    const {fullname,email,password}=req.body;
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message:"Provide all fields"}) 
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email already exists"});
        
        const salt= await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser= new User({
            fullname:fullname,
            email:email,
            password:hashPassword
        });

        if(newUser){
           //generate jwt token
           generateToken(newUser._id,res);
           await newUser.save();
           res.status(201).json({
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            profilePic:newUser.profilePic
           })
        }else{ 
           res.status(400).json({message:"Invaild data"});
        }
    } catch (error) {
        console.log("Error in SignUp",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

const login = async(req, res) => {
    const {email,password}=req.body;
    try {
        if( !email || !password){
            return res.status(400).json({message:"Provide all fields"}) 
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid credentials"});
       
       const isMatch= await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({message:"Invalid credentials"})
            } 
            generateToken(user._id,res);

            res.status(200).json({
                _id:user._id,
                fullname:user.fullname,
                email:user.email,
                profilePic:user.profilePic,
            })
          
    } catch (error) {
        console.log("Error in Login",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
      res.status(200).json({message:"Logged out successfully!"})
    } catch (error) {
        console.log("Error in signout",error.message);
        res.status(500).json({message:"Internal server error"});
  
    }
};


const checkAuth=(req,res) =>{
   try {
    res.status(200).json(req.user);
   } catch (error) {
    console.log("Error in checkauth",error.message);
    res.status(500).json({message:"Internal server error"});
   }
};

// Export functions as part of an object
module.exports = {
    signup,
    login,
    logout,
    checkAuth,
};
