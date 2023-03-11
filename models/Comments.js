import mongoose,  { Schema, model } from 'mongoose'; 


const CommentSchema = new Schema({ 
    Text: { 
        type: String, 
        required: true 
    },   
    date: { 
        type: Date, default: Date.now 
    },
    user:[{
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }],
    post:[{
        type: mongoose.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    }],
    deleted: {
        type: Boolean,
        default: false
    } 
}); 
 
export default model('Comment', CommentSchema);