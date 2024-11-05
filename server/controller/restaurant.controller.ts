import { Request,Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import uploadImageOnCloudinary from "../utils/uploadImage";


export const createRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        console.log(req.body)

        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            })
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            country,
            deliveryTime,
            cuisines,
            imageUrl
        });
        return res.status(201).json({
            success: true,
            message: "Restaurant Added"
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
};

export const getRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
           throw new Error("Restaurant not found!");
        };
        return res.status(200).json({ success: true, restaurant });
    } catch (error:any) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
};


export const updateRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
        console.log(req.body);
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        };
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.country = country;
        restaurant.deliveryTime = deliveryTime;
        // restaurant.cuisines = JSON.parse(cuisines);
        restaurant.cuisines = cuisines;

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        return res.status(200).json({
            success: true,
            message: "Restaurant updated",
            restaurant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
