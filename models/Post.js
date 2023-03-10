import mongoose, { Schema, model } from 'mongoose'

const postSchema = new Schema({
    content:{type: String, required: true},
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

export default model('Post', postSchema)
//posts 