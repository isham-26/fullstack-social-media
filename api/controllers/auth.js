import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs"

export const register=async(req,res)=>{
     try{
        const salt=await bcrypt.genSalt(10);
        const hashpass=await bcrypt.hash(req.body.password,salt)
        const newUser=new User({...req.body,password:hashpass});
        const user=await newUser.save()
        const {password,...other}=user._doc;
        res.status(200).json(other)
     }catch(err){
        res.status(500).json(err);
     }
}
export const login=async(req,res)=>{
     try{
        const user=await User.findOne({username:req.body.username})
        if(!user){
            res.status(403).json("user not found");
        }else{
            const validate=await bcrypt.compare(req.body.password,user.password)
            if(!validate){
                res.status(403).json('wrong password and user')
            }else{
                const {password,...other}=user._doc;
                res.status(200).json(other)
            }
        }
        
     }catch(err){
        res.status(500).json(err);
     }
}