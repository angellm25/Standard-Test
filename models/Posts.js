import mongoose, { Schema, model } from 'mongoose'

const postSchema = new Schema({
    content:{
        type: String, 
        required: true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
        
    },
    comments: [{
            type: String,
            created: {type: Date, default:Date.now},
            user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true
            },
            
        }],
        deleted: {
            type: Boolean, 
            default: false
        }

}, {timestamps: new Date()})

export default model('Post', postSchema)
//posts 