import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js"


//first create an app to use express
const app=express();
dotenv.config();
//setting the body parser to properly send the request
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use("/posts",postRoutes);
//now the next step is to connect to the database 
// const CONNECTION_URL="mongodb+srv://memoryapp:abc1234@cluster0.p4nezsm.mongodb.net/?retryWrites=true&w=majority";
app.get("/",(req,res)=>{
    res.send("Welcome to my travel app");
});

const PORT=process.env.PORT||5000;

//now connect our database using mongoose 
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
 .then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)))
 .catch((error)=>console.log(error.message));

//By these steps we are successfully connected to the data base








