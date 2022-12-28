import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import { FaUserFriends, FaCommentAlt } from "react-icons/fa";
import { HiChat, HiUserCircle, HiOutlineHome, HiBookmark, HiTemplate } from "react-icons/hi";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center w-full">
          <Outlet />
        </div>
        <div className="drawer-side lg:bg-indigo-100 border-primary">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 font-semibold text-primary">
            <li>
              <a><HiOutlineHome className="text-2xl"/> Home</a>
            </li>
            <li>
              <a><HiUserCircle className="text-2xl"/> Profile</a>
            </li>
            <li>
              <a><FaUserFriends className="text-2xl"/> Friends</a>
            </li>
            <li>
              <a><HiChat className="text-2xl"/> Message</a>
            </li>
            <li>
              <a><HiBookmark className="text-2xl"/> Saved Posts</a>
            </li>
            <li>
              <a><HiTemplate className="text-2xl"/> Your Posts</a>
            </li>
            <li>
              <a><FaCommentAlt className="text-2xl"/> All Comments</a>
            </li>
            <li>
              <a>All Comments</a>
            </li>
            <li>
              <Link to={'/register'}>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Main;
