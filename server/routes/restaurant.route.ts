import express from "express"
import { createRestaurant, getRestaurant} from "../controller/restaurant.controller";
import { isAuthenticated } from "../middlewares/authorised";
import upload from "../middlewares/multer";


const restauRouter = express.Router();

restauRouter.post("/",isAuthenticated, upload.single("imageFile"), createRestaurant);
restauRouter.get("/",isAuthenticated, getRestaurant);

export default restauRouter;


