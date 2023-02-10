import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Post from "../models/post.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Fetching posts failed, please try again",
        });
    }
};

/* export const createPost = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.body.photo, {
            upload_preset: "dalle",
        });

        const newPost = new Post({
            ...req.body,
            photo: result.secure_url,
            cloudinary_id: result.public_id,
        });

        await newPost.save();
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Creating a post failed, please try again",
        });
    }
}; */

export const createPost = async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(201).json({ success: true, data: newPost });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Unable to create a post, please try again",
        });
    }
};
