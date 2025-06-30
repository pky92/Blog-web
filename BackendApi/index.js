import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"
import authRoutes from "./routes/auth.routes.js"
const app = express();

dotenv.config()
const port = process.env.PORT

app.use(express.json())

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's origin
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  credentials: true,              // Allow credentials (cookies, headers)
}));

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


