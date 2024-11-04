import express from 'express';
import { login, signUp } from '../controller/user.controller';
const userRouter = express.Router();




// SingnUp the user...


userRouter.post("/signup",signUp)
userRouter.post("/login",login)

   

export default userRouter;