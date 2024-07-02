
import Post from "../models/Posts.js";
import User from "../models/User.js";
//create post
export const createPost = async (req, res) => {
    const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};
//get a post
export const getPost = async (req, res) => {
  try {
    const findpost = await Post.findById(req.params.id);
    res.status(200).json(findpost);
  } catch (err) {
    res.status(500).json(err);
  }
};
//update your post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body }, { new: true });
      res.status(200).json(post);
    } else {
      res.status(403).json("update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//delete your post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("post has been deleted");
    } else {
      res.status(403).json("delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//likes posts
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne(
        { $push: { likes: req.body.userId } },
        { new: true }
      );
      res.status(200).json("post has been like");
    } else {
      await post.updateOne(
        { $pull: { likes: req.body.userId } },
        { new: true }
      );
      res.status(200).json("post has been dislike");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
//get yours and following people posts

export const getAllPost = async(req,res)=>{
    try{
        const user=await User.findById(req.params.userId)
        const sortOptions = { createdAt: -1 };
        const userPost= await Post.find({userId:user._id}).sort(sortOptions)
        
         const followingPosts= await Promise.all(user.following.map((id)=>{
             return Post.find({userId:id}).sort(sortOptions)
        }))
        //res.status(200).json(followingPosts)
        // const allposts=[...followingPosts,...userPost]
         res.status(200).json(userPost.concat(...followingPosts))
    }catch(err){
        res.status(500).json(err);
   }
     

}
export const getAllUserPost = async(req,res)=>{
    try{
        const user=await User.findOne({username:req.params.username})
        const sortOptions = { createdAt: -1 };
        const userPost= await Post.find({userId:user._id}).sort(sortOptions)
         res.status(200).json(userPost)
    }catch(err){
        res.status(500).json(err);
   }
}
