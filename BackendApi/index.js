import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
const app = express();

dotenv.config()
const port = process.env.PORT

app.use(express.json())

mongoose.connect(process.env.DB_URL).then(()=>
{
    console.log("database connected successfully")
}).catch((err)=>{
    console.log("throwing Error while connecting with database ",err);
})

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);


app.listen(port || 3000 , ()=>{
    console.log(`server is runing on port ${port}!!`);
})


