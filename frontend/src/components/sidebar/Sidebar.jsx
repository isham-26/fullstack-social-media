import "./sidebar.css";

import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { SlFeed } from "react-icons/sl";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import { BsChatSquareText } from "react-icons/bs";
import { IoBookmarksOutline } from "react-icons/io5";
import { SlQuestion } from "react-icons/sl";
import { MdEvent } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";
import { IoBagOutline } from "react-icons/io5";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <SlFeed className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Feed</span>
          </li>
          <li className="sidebarListItem">
            <BsChatSquareText className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Chats</span>
          </li>
          <li className="sidebarListItem">
          <MdOutlineOndemandVideo className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Videos</span>
          </li>
          <li className="sidebarListItem">
            <GrGroup className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Groups</span>
          </li>
          <li className="sidebarListItem">
            <IoBookmarksOutline className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <SlQuestion className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Questions</span>
          </li>
          <li className="sidebarListItem">
            <IoBagOutline className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Jobs</span>
          </li>
          <li className="sidebarListItem">
           <MdEvent className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Events</span>
          </li>
          <li className="sidebarListItem">
           <FaGraduationCap className="text-2xl"/>
            <span className="sidebarListItemText mx-3">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
