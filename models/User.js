import mongoose, { Schema, model } from 'mongoose'

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }, 
    posts: [{
        type: mongoose.Types.ObjectId, 
        ref: "Post", 
        required: true
    }],
    deleted:{type: Boolean, default: false}

},  {timestamps: true})

export default model('User', UserSchema)

//users