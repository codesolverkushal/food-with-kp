import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import cloudinary from "../utils/cloudinary";
import { generateToken } from "../utils/generateToken";
import { generateVerificationCode } from "../utils/generateVerificationCode";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/email";

export const signup = async (req: Request, res: Response): Promise<void> => {

    try {
        const { fullname, email, password, contact } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            throw new Error("Email is already registered!")
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken =  generateVerificationCode();

        user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })

        generateToken(res,user);
        

        await sendVerificationEmail(email,verificationToken);

        const userWtPassword = await User.findOne({ email }).select("-password");
        res.status(200).json({
            message: "Welcome to our team!",
            user: userWtPassword
        })
    } catch (error: any) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid Credentials!");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new Error("Invalid Credentials!")
        }

        generateToken(res,user);

        user.lastLogin = new Date();
        await user.save();

        const userWtPassword = await User.find({ email }).select("-password");

        res.status(200).send({
            message: "Logged In successfully!",
            user: userWtPassword
        })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }

};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { verificationCode } = req.body;
        const user = await User.findOne({ verificationToken: verificationCode, verificationTokenExpiresAt: { $gt: Date.now() } }).select("-password");

        if (!user) {
            throw new Error("Invalid or expired verification token");
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined
        await user.save();

        // send welcome email
        await sendWelcomeEmail(user.email, user.fullname);

        res.status(200).json({
            success: true,
            message: "Email verified successfully.",
            user,
        })

    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
};

export const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
};

export const forgotPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const resetToken = crypto.randomBytes(40).toString('hex');
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
        await user.save();

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`);

        return res.status(200).json({
            success: true,
            message: "Password reset link sent to your email"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const resetPassword = async (req: Request, res: Response): Promise<any> => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordTokenExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }
        //update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();

        // send success reset email
        await sendResetSuccessEmail(user.email);

        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const checkAuth = async(req:Request, res:Response): Promise<any>=>{
    try{
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        };
        return res.status(200).json({
            success: true,
            user
        });

    }catch(error:any){
        return res.status(500).send({message: error.message})
    }
};

export const updateProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.id;
        const { fullname, email, address, city, country, profilePicture } = req.body;
        // upload image on cloudinary
        let cloudResponse: any;
        cloudResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedData = {fullname, email, address, city, country, profilePicture};

        const user = await User.findByIdAndUpdate(userId, updatedData,{new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user,
            message:"Profile updated successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}