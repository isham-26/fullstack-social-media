import User from "../models/User.js";
import bcrypt from "bcryptjs";
export const updateuser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      const { password, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(401).json(err);
    }
  } else {
    res.status(500).json("update only your account");
  }
};
export const deleteuser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.body.userId);
      res.status(200).json("user succesfully deleted!");
    } catch (err) {
      res.status(401).json(err);
    }
  } else {
    res.status(500).json("update only your account");
  }
};
export const getuserquery = async (req, res) => {
  const userId=req.query.userId
  const username=req.query.username
  try {
    const user=userId?await User.findById(userId):await User.findOne({username:username})
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(401).json("user not found");
  }
};
export const getuser = async (req, res) => {
 
  try {
    const user=await User.findById(req.params.id)
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(401).json("user not found");
  }
};
export const getuserbyname = async (req, res) => {
  try {
    const user=await User.findOne({username:req.params.username})
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(401).json("user not found");
  }
};
export const follow=async(req,res)=>{
    if(req.params.id!==req.body.userId){

        try{
            const searchUser=await User.findById(req.params.id);
            const currUser=await User.findById(req.body.userId)
            if(!searchUser.followers.includes(req.body.userId)){
                await searchUser.updateOne({$push:{followers:req.body.userId}})
                await currUser.updateOne({$push:{following:req.params.id}})
                
            }else{
              res.status(403).json("you already follow this user!")
            }
            res.status(200).json("user has been follow")
        }catch(err){
            res.status(500).json(err)
        }

    }
    else{
        res.status(500).json("not follow yourself")
    }
}
export const unfollow=async(req,res)=>{
    if(req.params.id!==req.body.userId){

        try{
            const searchUser=await User.findById(req.params.id);
            const currUser=await User.findById(req.body.userId)
            if(searchUser.followers.includes(req.body.userId)){
                await searchUser.updateOne({$pull:{followers:req.body.userId}})
                await currUser.updateOne({$pull:{following:req.params.id}})
                res.status(200).json("user has been unfollow")
            }else{
                res.status(403).json("you already unfollow this user!")
            }
        }catch(err){
            res.status(500).json(err)
        }

    }
    else{
        res.status(500).json("not follow yourself")
    }
}
export const getfriend = async (req, res) => {
 
  try {
    const user=await User.findById(req.params.id)
    const friends=await Promise.all(user.following.map((id)=>{
        return User.findById(id)
    }))
    res.status(200).json(friends);
  } catch (err) {
    res.status(401).json("user not found");
  }
};
