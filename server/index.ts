import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1/user",userRouter);




const PORT = 3000;

app.listen(PORT,()=>{
    connectDb();
    console.log(`Connected successfully on port ${PORT}`)
});
