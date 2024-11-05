import express from "express"
import { createRestaurant} from "../controller/restaurant.controller";
import { isAuthenticated } from "../middlewares/authorised";
import upload from "../middlewares/multer";


const restauRouter = express.Router();

restauRouter.post("/",isAuthenticated, upload.single("imageFile"), createRestaurant);


export default restauRouter;


