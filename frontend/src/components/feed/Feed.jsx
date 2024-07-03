import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../utility";
import { AppContext } from "../context/contextProvider";
// import { useParams } from "react-router";
export default function Feed({ user }) {
  const {state}=useContext(AppContext)
  // const param=useParams()
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const res = user?.username
      ? await axios.get(`${url}/posts/profile/${user?.username}`)
         : await axios.get(`${url}/posts/allpost/${state?.user._id}`);
      setPosts(res.data);
    };
    fetchPost();
  }, [user?.username,state?.user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {((!user?.username)||(state.user.username===user?.username))&&<Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
