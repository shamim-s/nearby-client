import React from "react";
import { FaUserFriends, FaCommentAlt } from "react-icons/fa";
import { HiChat, HiUserCircle, HiOutlineHome, HiBookmark, HiTemplate } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="navbar bg-primary flex justify-between items-center">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
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
              <a><FaCommentAlt className="text-xl"/> All Comments</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl text-white font-semibold">NearBy</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-primary input-bordered"
          />
        </div>
      </div>
      <div className="avatar mr-2">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://placeimg.com/192/192/people" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
