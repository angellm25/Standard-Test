
import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const getAllPosts = async(req, res, next) => {
    let posts;
    try{
        posts = await Post.find();
    } catch(err){
        return console.log(err)
    }
    if(!posts){
        return res.status(404).json({message: "No Posts Found"})
    }
    return res.status(200).json(posts)
}

export const addPost = async(req, res, next) => {
    const {content, user} = req.body;

    let existingUser;
    try{
        existingUser = await User.findById(user);
    } catch(err) {
        return console.log(err)
    }
    if(!existingUser) {
        return res.status(400).json({message:  "Unable To Find User By This ID"})
    }
    const post = new Post({content, user})
    try {
        const session = await mongoose.startSession()
        session.startTransaction()
        await post.save({session})
        existingUser.posts.push(post)
        await existingUser.save({session})
        session.commitTransaction();
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err})
    }
    return res.status(200).json({post})
} 

export const editBlog = async(req, res,next) => {
    const postId = req.params.id;
    const {content} = req.body;
    let post;
    try{
    post = await Post.findByIdAndUpdate(postId, {content})
    } catch(err){
        return console.log(err)
    }
    if(!post){
        return res.status(500).json({message: "Unable To Edit"})
    }
    return res.status(200).json({post})
}

export const getById = async(req,res,next) => {
    const id = req.params.id;
    let post;
    try{
        post = await Post.findById(id);
    } catch(err){
        return console.log(err)
    }
    if(!post){
        return res.status(404).json({message: "No Post Found"})
    }
    return res.status(200).json({post})
} 

export const deletePost = async(req,res,next) => {
    const id = req.params.id;

    let post;
    try{
        post = await Post.findByIdAndRemove(id).populate('user')
        await post.user.posts.pull(post)
        await post.user.save()
    } catch(err) {
        return console.log(err)
    }
    if(!post) {
        return res.status(500).json({message: "Unable To Delete"})
    }
    return res.status(200).json({message: "Successfully Deleted"})
}

export const getByUserId = async(req,res,next) => {
    const userId = req.params.id;
    let userPosts;
    try{
        userPosts = await User.findById(userId).populate("post")
    } catch(err) {
        return console.log(err)
    }
    if(!userPosts) {
        return res.status(404).json({message: "No Post Found"})
    }
    return res.status(200).json({posts: userPosts})
}


