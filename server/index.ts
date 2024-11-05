import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

const app = express();

// default middleware for any mern project

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "https://food-app-yt.onrender.com",
    credentials: true
}
app.use(cors(corsOptions));


app.use("/api/v1/user",userRouter);




const PORT = 3000;

app.listen(PORT,()=>{
    connectDb();
    console.log(`Connected successfully on port ${PORT}`)
});
