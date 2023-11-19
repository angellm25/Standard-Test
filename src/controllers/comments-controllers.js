import Comment from "../src/models/Comments.js";
import mongoose from 'mongoose'
import Post from "../src/models/Posts.js"

export const getComments = async(req, res, next) => {
    const postId = req.params.id;
    let userComments;
    try{
        userComments = await Comment.findById(postId).sort({_id: -1})
        } catch (err) {
        return console.log(err)
    } 
    if(!userComments) {
        return res.status(400).json({message:  "Unable To Find Comments"})
    }
    return res.status(200).json({comments: userComments})
} 

export const addComment = async (req, res, next) => { 
    const {post, user, Text} = req.body;
 
   let exsistingPost;
   try{
    exsistingPost = await Post.findById(post)
   } catch (err) {
    return console.log(err)
   }
   if(!exsistingPost) {
    return res.status(400).json({message:  "Unable To Find Post"})
}
 const comment = new Comment({post, user, Text})
 try{
    const session = await mongoose.startSession()
        session.startTransaction()
        await comment.save({session})
        exsistingPost.comments.push(comment)
        await exsistingPost.save({session})
        session.commitTransaction();
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err})
    }
    return res.status(200).json({comment})
}
  


export const deleteComment = async(req,res,next) => {
    const id = req.params.id;

    let comment;
    try{
        comment = await Comment.findByIdAndUpdate({id}, {deleted: true}, {new: true})
    } catch(err) {
        return console.log(err)
    }
    if(!comment) {
        return res.status(500).json({message: "Unable To Delete"})
    }
    return res.status(200).json({message: "Successfully Deleted"})
}