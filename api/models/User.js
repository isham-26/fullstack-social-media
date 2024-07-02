import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    profilePic:{
        type:String,
        default:""
    },
    relation:{
        type:String,
        default:""
    },
    coverPic:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true})
export default mongoose.model("User",UserSchema)