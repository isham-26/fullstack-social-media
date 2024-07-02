import "./share.css";
import { IoLocationOutline } from "react-icons/io5";
import { BiSolidTagAlt } from "react-icons/bi";
import { FaPhotoVideo } from "react-icons/fa";
import { GrEmoji } from "react-icons/gr";
import { useContext, useState } from "react";
import { AppContext } from "../context/contextProvider";
import avtar from "../../images/noavtar.jpg";
import axios from "axios";
import { url } from "../../utility";
import { useNavigate } from "react-router-dom";
export default function Share() {
  const { state } = useContext(AppContext);
  const [image,setImage]=useState();
  const [desc,setdesc]=useState();
  const navigate=useNavigate()
  const uploadImage = async (e) => {
    const files = e.target.files;
    // console.log(files);
    const data = new FormData();
    if (files) {
      data.append("file", files[0]);
      data.append("upload_preset", "a3tvpua0");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/disqmcsrf/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setImage(file.secure_url);
      
    }
  };
  const submit=async(e)=>{
    e.preventDefault()
    console.log("firse")
      const new_post={
         userId:state.user._id,
         image:image,
         desc:desc
      }
      try{
        const res=await axios.post(`${url}/posts`,new_post)
        if(res){
           navigate("/")
        }
      }catch(err){
          console.log("error here")
      }
      

  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={state.user?.profilePic || avtar}
            alt=""
          />
          <input
            placeholder={`What's in your mind ${state.user.username}?`}
            className="shareInput" onChange={(e)=>setdesc(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submit}>
          <div className="shareOptions">
            <div className="shareOption">
              <label htmlFor="user" className="flex">
                <FaPhotoVideo className="text-2xl mx-2"  />
                <span className="shareOptionText">Photo or Video</span>
              </label>
                <input type="file" className="hidden" id="user" onChange={uploadImage}/>
            </div>
            <div className="shareOption">
              <BiSolidTagAlt className="text-2xl mx-2" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <IoLocationOutline className="text-2xl mx-2" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <GrEmoji className="text-2xl mx-2" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="onsubmit">Share</button>
        </form>
      </div>
    </div>
  );
}
