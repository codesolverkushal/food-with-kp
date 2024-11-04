import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';

export const signUp = async(req: Request,res: Response): Promise<void>=>{

    try {
        const {fullname,email,password,contact} = req.body;
        
        let user = await User.findOne({email});
        if(user){
            throw new Error("Email is already registered!")
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const verificationToken = "codesolverkushafija"; // generateVerification();

        user = await User.create({
            fullname,
            email,
            password:hashedPassword,
            contact:Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })

        // generateToken(res,user);

        // await sendVerificationEmail(email,verificationToken);
    
        const userWtPassword = await User.findOne({email}).select("-password");
        res.status(200).json({
            message: "Welcome to our team!",
            user:userWtPassword
        })
    } catch (error:any) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
};

export const login = async(req:Request, res:Response): Promise<void>=>{

    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw new Error("Invalid Credentials!");
        }

        const checkPassword = await bcrypt.compare(password,user.password);

        if(!checkPassword){
            throw new Error("Invalid Credentials!")
        }
        
        // generateToken(res,user);
        
        user.lastLogin = new Date();
        await user.save();

        const userWtPassword = await User.find({email}).select("-password");

        res.status(200).send({
            message:"Logged In successfully!",
            user: userWtPassword
        })
    } catch (error:any) {
        res.status(500).send({message:error.message})
    }

};

