import { useState } from "react";
import "./register.css";
import axios from "axios";
import { url } from "../../utility";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const handleSubmit=async(e)=>{
     e.preventDefault()
     const new_user={
        username:name,
        email:email,
        password:password
     }
     try{

       const user=await axios.post(`${url}/auth/register`,new_user)
       if(user){
         navigate("/login")
       }
       e.target.reset();
     }catch(err){

     }
    
  }
  return (
    <div className="login" onSubmit={handleSubmit}>
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social-media</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on social-media.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input placeholder="Username" className="loginInput" onChange={(e)=>setName(e.target.value)}/>
            <input placeholder="Email" className="loginInput" onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password" className="loginInput" onChange={(e)=>setPassword(e.target.value)}/>
            {/* <input placeholder="Password Again" className="loginInput" /> */}
            <button className="loginButton" type="onsubmit">Sign Up</button>
            <Link to="/login">
            <button className="loginRegisterButton">
              Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
