import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import authRouter from "./routers/auths.js"
import userRouter from "./routers/users.js"
import postsRouter from "./routers/posts.js"
const app=express();
dotenv.config();
let port=process.env.PORT
let mongoUrl=process.env.URL
const connect=async()=>{
    try{
        await mongoose.connect(mongoUrl)
        console.log("db connected");
    }catch(err){

    }
}
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001"],
    credentials:true,
}))
app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/posts",postsRouter)

app.listen(port,()=>{
    connect();
    console.log(`backend is running on ${port}`)
})
