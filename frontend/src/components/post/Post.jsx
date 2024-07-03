import "./post.css";
import { useState,useEffect, useContext } from "react";
import noavtar from "../../images/noavtar.jpg"
import axios from "axios"
// import {format} from "timeago.js"
import { url } from "../../utility";
import like from "../../images/assets/like.png"
import heart from "../../images/assets/heart.png"
import {Link} from "react-router-dom"
import { AppContext } from "../context/contextProvider";
export default function Post({ post }) {
  const [likes,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const {state}=useContext(AppContext)

  const [user,setuser]=useState({})
  useEffect(()=>{
    setIsLiked(post.likes.includes(state.user._id))
  },[post.likes,state.user._id])
 useEffect(()=>{
    const fetchUser=async()=>{
       const res=await axios.get(`${url}/users/id/${post.userId}`)
       //console.log(res.data)
       setuser(res.data)
    }
    fetchUser()
 },[post.userId])
  const likeHandler =async()=>{
    
    try{

      await axios.put(`${url}/posts/${post._id}/likes`,{userId:state.user._id})
      //  window.location.reload()
    }catch(err){
        throw(err)
    }
    setLike(isLiked ? likes-1 : likes+1)
    setIsLiked(!isLiked)
    

  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
          <Link to={`/profile/${user.username}`}>

            <img
              className="postProfileImg"
               src={user?.profilePic||noavtar}
              alt=""
            />
          </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
          </div>
          <div className="postTopRight">
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post?.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={like} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={heart} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{likes} likes</span>
          </div>
          <div className="postBottomRight">
            {/* <span className="postCommentText">{post.comment} comments</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
