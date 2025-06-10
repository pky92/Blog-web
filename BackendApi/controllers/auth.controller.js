import e from "express";
import bcryptjs from "bcryptjs"
import User from "../model/user.model.js";

export const signUp = async(req,res)=>{

    try{
        const {userId , password , email} = req.body;

        if(!userId || !password || !email || email.trim()==="" || password.trim()==='' || userId.trim()===''){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory!!"
            })
        }

        const hashedPassword =await bcryptjs.hash(password , 10);

        const newUser = new User({
            userId,
            password: hashedPassword,
            email : email.toLowerCase()
        })

        await newUser.save();
        return res.status(200).json({
            success:true,
            message:"new user created successfully",
            newUser
        })
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"got error while SignUp",
            errorMessage:err.message,
            err
            
        })
    }

}