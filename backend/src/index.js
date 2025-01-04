const express= require('express');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messageAuth');
const dotenv= require('dotenv');
const connectDB = require('./lib/db');
const cors= require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {app,server} = require("./lib/socket.js");
const path= require("path");

dotenv.config();

const __dirname= path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
}));
app.use(bodyParser.json({ limit: '500mb' }));  // Increase the limit (e.g., to 50MB)
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

const PORT= process.env.PORT;

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));


  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });
}

server.listen(PORT,()=>{
  console.log('server is running');
  connectDB();
})