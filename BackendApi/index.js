import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
const app = express();

dotenv.config()
const port = process.env.PORT

mongoose.connect(process.env.DB_URL).then(()=>
{
    console.log("database connected successfully")
}).catch((err)=>{
    console.log("throwing Error while connecting with database ",err);
})



app.listen(port || 3000 , ()=>{
    console.log("server is runing on port 3000!!");
})