import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb';

dotenv.config();

const app = express();

const PORT = 3000;

app.listen(PORT,()=>{
    connectDb();
    console.log(`Connected successfully on port ${PORT}`)
});
