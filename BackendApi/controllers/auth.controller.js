import e from "express";
import bcryptjs from "bcryptjs"
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import jwt from 'jsonwebtoken'

export const signUp = async(req,res)=>{

    try{
        const {userId , password , email } = req.body;

        if(!userId || !password || !email || email.trim()==="" || password.trim()==='' || userId.trim()==='' ){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory!!"
            })
        }

        const hashedPassword = await bcryptjs.hash(password , 10);

        const res1 = await User.findOne({$or :[{email:email},{userId:userId}]});
        // const res2 = await User.findOne({userId:userId});

        if(res1 ){
            return res.status(409).json({
                success:false,
                message:"Account already exist with this email/userid"
            })
        }
        //   if(res2 ){
        //     return res.status(409).json({
        //         success:false,
        //         error:"Account already exist with this email/userid"
        //     })
        //   }


        const newUser = new User({
            userId ,
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
            message:"Internal server error while SignUp",
            errorMessage:err.message,
            err
            
        })
    }

}
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email/username and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory!",
            });
        }

        // Determine if the input is an email or a userId
        const isEmail = email.includes('@');
        const user = isEmail
            ? await User.findOne({ email })
            : await User.findOne({ userId: email });

            

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // console.log("Issued token:", token);

        const {password:pass , ...safeUser} = user._doc;
        console.log("user ",safeUser)

        // Return success response with token
        return res.status(200)
            .cookie('AccessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Ensures secure cookies in production
                maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
            })
            .json({
                success: true,
                safeUser,
                message: "User signed in successfully",
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errorMessage: err.message,
        });
    }
};
