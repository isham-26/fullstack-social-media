import mongoose from "mongoose";

const PostsSchema=new mongoose.Schema({
    userId:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        default:""
    },
    likes:{
        type:Array,
        default:[]
    },
},{timestamps:true})
export default mongoose.model("Posts",PostsSchema)