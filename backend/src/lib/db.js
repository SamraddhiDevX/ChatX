const mongoose= require('mongoose');

const connectDB= async()=>{
    try {
        const conect=await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb is connected")
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB;