import User from "../models/User.js";
import bcrypt from 'bcrypt'

export const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

if (!users) {
    return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({users});
}

export const signup = async(req, res, next) => {
    const {username,email,password} =   req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err);
    }
    if(existingUser){
        return res
        .status(400)
        .json({message: "User Exists! Login Instead!"});
    }
    const hashedPassword = bcrypt.hashSync(password)

    const user = new User({
        username,
        email,
        password: hashedPassword,
        posts: [],
    })
   

    try{
        await user.save()
    }catch(err){
        return console.log(err)
    }
    return res.status(201).json({ user});

}

export const login = async(req,res,next) => {
    const {email,password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (err) {
       return console.log(err);
    }
    if(!existingUser){
        return res
        .status(404)
        .json({message: "No User With That Email"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if(!isPasswordCorrect) {
        return res
       .status(400)
       .json({message: "Incorrect Password"})
    } return res.status(200).json({message:"Login Successful."})

}

export const getByUserId = async(req, res, next) => { 
    User.find({ _id: req.params.id }).then(result => { 
            res.status(200).json({ 
                message: result 
            }); 
        }). 
        catch(err => { 
            res.status(404).json({ 
                message: err 
            }); 
        }); 
} 

export const deleteUser = async(req,res,next) => {
    const id = req.params.id;

    let existingUser;
    try{
        existingUser = await User.findByIdAndRemove(id)
        existingUser.deleted = true;
    } catch(err) {
        return console.log(err)
    }
    if(!existingUser) {
        return res.status(500).json({message: "Unable To Delete"})
    }
    return res.status(200).json({message: "Successfully Deleted"})
}

export const updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { username, password, email} = req.body;
    let user;
    try{
        user = await User.findByIdAndUpdate(userId, {username, email, password})
    } catch(err) {
        return console.log(err)
    }
    if(!user) {
        return res.status(500).json({message: "Unable To Update"})
    }
    return res.status(200).json({user})
}