import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaUserFriends, FaCommentAlt } from "react-icons/fa";
import { HiChat, HiUserCircle, HiOutlineHome, HiBookmark, HiTemplate } from "react-icons/hi";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Context";

const Navbar = () => {
  const {user, logOut, setUser} = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
    .then(() => {
      setUser({});
      toast.success('Logout Successfully');
    })
    .then(err => {
      console.log(err);
      toast.error(err.message);
    })
  }
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
              <Link to={'/'}><HiOutlineHome className="text-2xl"/> Home</Link>
            </li>
            <li>
              <Link to={`/user/${user?.email}`}><HiUserCircle className="text-2xl"/> Profile</Link>
            </li>
            <li>
              <Link><FaUserFriends className="text-2xl"/> Friends</Link>
            </li>
            <li>
              <Link><HiChat className="text-2xl"/> Message</Link>
            </li>
            <li>
              <Link><HiBookmark className="text-2xl"/> Saved Posts</Link>
            </li>
            <li>
              <Link><HiTemplate className="text-2xl"/> Your Posts</Link>
            </li>
            <li>
              <Link><FaCommentAlt className="text-xl"/> All Comments</Link>
            </li>
            {
              user?.email ? <button onClick={handleLogout} className="btn btn-primary btn-sm">Log out</button> : <>
              <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/register'}>Register</Link>
            </li>
              </>
            }
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
      {
        user?.email ? <div className="avatar mr-2">
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user.photoURL} />
        </div>
      </div> :
      <Link to={'/login'} className="btn bg-white text-primary shadow-md hover:bg-primary hover:text-white">Login</Link>
      }
    </div>
  );
};

export default Navbar;
