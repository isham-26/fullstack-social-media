import { Link } from "react-router-dom";
import "./login.css";
import { useContext, useState } from "react";
import axios from "axios";
import { url } from "../../utility";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../../components/context/contextProvider";
export default function Login() {
  const {state,dispatch}=useContext(AppContext)
  const navigate = useNavigate();
  const [name,setname]=useState();
  const [password,setPassword]=useState();
  // const [error,setError]=useState(false);
  const handleSubmit=async(e)=>{
     e.preventDefault()
     dispatch({
       type:"LOGIN_START"
     })
     const login_user={
        username:name,
        password:password
     }
     try{

       const user=await axios.post(`${url}/auth/login`,login_user)
       if(user){
        user.data.isAdmin=true;
        dispatch({
          type:"LOGIN_SUCCESS",
          payload:user.data
        })
         navigate("/")
       }
       e.target.reset();
     }catch(err){
      dispatch({
        type:"LOGIN_FAILER"
      })
     }
   
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social-media</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on social-media.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input placeholder="username" className="loginInput" onChange={(e)=>setname(e.target.value)}/>
            <input placeholder="Password" className="loginInput" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="loginButton" type="onsubmit">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <div className="flex justify-between w-full">
            <Link to="/register" className="loginRButton">
            <button >
              Create a New Account
            </button>
            </Link>
            {state.error && <span className="text-red-600 text-xl">user not exist</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
