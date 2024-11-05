import express from "express"
import { createRestaurant, getRestaurant, updateRestaurant} from "../controller/restaurant.controller";
import { isAuthenticated } from "../middlewares/authorised";
import upload from "../middlewares/multer";


const restauRouter = express.Router();

restauRouter.post("/",isAuthenticated, upload.single("imageFile"), createRestaurant);
restauRouter.get("/",isAuthenticated, getRestaurant);
restauRouter.put("/",isAuthenticated, upload.single("imageFile"), updateRestaurant);

export default restauRouter;


