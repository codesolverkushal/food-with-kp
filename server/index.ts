import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route';
import bodyParser from 'body-parser';
import cors from 'cors';
import restauRouter from './routes/restaurant.route';
import menuRouter from './routes/menu.route';
import orderRoute from './routes/order.route';
import path from 'path';

dotenv.config();

const app = express();

const DIRNAME = path.resolve();

// default middleware for any mern project

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));


app.use("/api/v1/user",userRouter);
app.use("/api/v1/restaurant", restauRouter);
app.use("/api/v1/menu", menuRouter);
app.use("/api/v1/order", orderRoute);


app.use(express.static(path.join(DIRNAME,"/client/dist")));
app.use("*",(_,res) => {
    res.sendFile(path.resolve(DIRNAME, "client","dist","index.html"));
});


const PORT = 3000;

app.listen(PORT,()=>{
    connectDb();
    console.log(`Connected successfully on port ${PORT}`)
});
