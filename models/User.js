import mongoose, { Schema, model } from 'mongoose'
import isEmail from 'validator'
import generateRandomAvatar from '../public/avatar.js'

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    }, 
    avatarStyle : {
        type: String,
        enum: avatarStyles,
        default: avatarStyles[0]
    },
    avatarUrl: {
        type: String,
        required: true,
        unique: true
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