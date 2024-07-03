import "./topbar.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { BsChatSquareText } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { useContext, useState } from "react";
import { AppContext } from "../context/contextProvider";
import avtar from "../../images/noavtar.jpg"
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../utility";
export default function Topbar() {
  const navigate=useNavigate();
  const {state}=useContext(AppContext)
  const [search,setSearch]=useState()
  const searchHandle=async()=>{
    try{

      const res=await axios.get(`${url}/users?username=${search}`)
      if(res){
        navigate(`/profile/${res.data.username}`)
      }
    }catch(err){}
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
      <Link to='/'>
        <span className="logo">social-media</span>
        </Link>
      </div>
      <div className="topbarCenter flex gap-3">
        <div className="searchbar">
        <IoIosSearch className="mx-3"/>
          <input
            placeholder="Search for friend"
            className="searchInput"
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
        <button className="py-1 px-4 rounded-full bg-white" onClick={searchHandle}>Search</button>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
           <IoPersonOutline className="text-2xl"/>
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <BsChatSquareText className="text-2xl"/>
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
          <IoMdNotificationsOutline className="text-2xl"/>
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${state.user.username}`}>
        <img src={state.user?.profilePic||avtar} alt="" className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}
