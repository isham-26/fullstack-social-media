import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import ad from "../../images/assets/ad.png";
// import person from "../../images/assets/person/1.jpeg";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/contextProvider";
import { url } from "../../utility";
import axios from "axios";
import avtar from "../../images/noavtar.jpg"
import { Link } from "react-router-dom";
export default function Rightbar({ user }) {
  const { state, dispatch } = useContext(AppContext);
  const [foll, setfoll] = useState(state.user.following.includes(user?._id));
  const [friends, setfriends] = useState([]);
  useEffect(() => {
    const getFriend = async () => {
      try {
        const res = await axios.get(`${url}/users/friends/${state.user._id}`);
        setfriends(res.data);
      } catch (err) {}
    };
    getFriend();
  }, []);
  const followhandle = async () => {
    try {
      if (foll) {
        await axios.put(`${url}/users/${user._id}/unfollow`, {
          userId: state.user._id,
        });
        dispatch({
          type: "UNFOLLOW",
          payload: user._id,
        });
      } else {
        await axios.put(`${url}/users/${user._id}/follow`, {
          userId: state.user._id,
        });
        dispatch({
          type: "FOLLOW",
          payload: user._id,
        });
      }
    } catch (err) {}

    setfoll(!foll);
  };
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src={ad} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {friends.map((u, indx) => (
            <Online key={indx} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className="flex gap-20 items-center">
          <h4 className="rightbarTitle">User information</h4>
          {state.user._id !== user?._id && (
            <button
              className="bg-blue-500 py-1 px-2 text-white rounded-sm"
              onClick={followhandle}
            >
              {foll ? "unfollow" : "follow"}
            </button>
          )}
        </div>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend, index) => {
            return (
              <Link to={`/profile/${friend.username}`} key={index}>
              <div className="rightbarFollowing">
                <img src={friend?.profilePic||avtar} alt="" className="rightbarFollowingImg" />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
