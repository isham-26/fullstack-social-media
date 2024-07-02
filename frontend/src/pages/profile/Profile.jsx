import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

import cover from "../../images/assets/post/3.jpeg"
import { useState,useEffect } from "react";
import noavtar from "../../images/noavtar.jpg"
import axios from "axios";
import { url } from "../../utility";
import { useParams } from "react-router";
export default function Profile() {

  const [user,setuser]=useState({})
  const param=useParams()
 useEffect(()=>{
    const fetchUser=async()=>{
       const res=await axios.get(`${url}/users/${param.username}`)
      //  console.log(param)
      //  console.log(res.data)
       setuser(res.data)
    }
    fetchUser()
 },[param.username])
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user?.coverPic||cover}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user?.profilePic||noavtar}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed user={user}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
