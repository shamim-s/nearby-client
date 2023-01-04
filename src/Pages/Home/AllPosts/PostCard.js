import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/Context';
import { HiOutlineHeart, HiHeart } from "react-icons/hi";

const PostCard = ({post}) => {
    const {user} = useContext(AuthContext);
    const {content, date, img, userEmail, userImg, userName, _id} = post;

    const [likes, setLikes] = useState([]);
    const [currentUserLiked, setCurrentUserLiked] = useState(false);

    useEffect(()=> {
      fetch(`http://localhost:5000/post/${_id}`)
      .then(res => res.json())
      .then(data => setLikes(data))
    },[likes])

    const handleLike = () => {
      const postInfo = {
        likedUserName: user.displayName,
        likedUserEmail: user.email,
        PostId: _id,
      }
        fetch(`http://localhost:5000/post/like`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postInfo)
                  })
                 .then(res => res.json())
                 .then(data => console.log(data))
    }

    const handleTest = () => {
      const isLiked = likes.find(like => like.likedUserEmail === user.email)
      if (isLiked) {
        setCurrentUserLiked(true);
      }
    }

    return (
        <div className="mt-5 mb-5 w-96 mx-auto">
      <div className="rounded-md shadow-xl">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-2">
            <img
              src={userImg}
              alt=""
              className="object-cover object-center w-8 h-8 rounded-full shadow-sm"
            />
            <div className="-space-y-1">
              <h2 className="text-sm font-semibold leading-none">
                {
                    userEmail === user?.email ? "Just You" : <span>{userName}</span>
                }
              </h2>
            </div>
          </div>
          <button title="Open options" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5 fill-current"
            >
              <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z"></path>
              <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z"></path>
              <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z"></path>
            </svg>
          </button>
        </div>
        <img
          src={img}
          alt=""
          className="object-cover object-center w-full h-72"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">

             {
              currentUserLiked ?  <button
              type="button"
              onClick={handleLike}
              title="Like post"
              className="flex items-center justify-center"
            >
             <HiOutlineHeart className=' text-2xl'/>
            </button> :
            
            <button
            type="button"
            title="Like post"
            onClick={handleTest}
            className="flex items-center justify-center"
          >
           <HiHeart className='text-red-500 text-2xl'/>
          </button>


             }

              <button
                type="button"
                title="Share post"
                className="flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"></path>
                </svg>
              </button>
            </div>
            <button
              type="button"
              title="Bookmark post"
              className="flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5 fill-current"
              >
                <path d="M424,496H388.75L256.008,381.19,123.467,496H88V16H424ZM120,48V456.667l135.992-117.8L392,456.5V48Z"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-wrap items-center pt-3 pb-1">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                <img
                  alt=""
                  className="w-5 h-5 border rounded-full "
                  src="https://source.unsplash.com/40x40/?portrait?1"
                />
                <img
                  alt=""
                  className="w-5 h-5 border rounded-full"
                  src="https://source.unsplash.com/40x40/?portrait?2"
                />
                <img
                  alt=""
                  className="w-5 h-5 border rounded-full"
                  src="https://source.unsplash.com/40x40/?portrait?3"
                />
              </div>
              <span className="text-sm">
                Total Like
                <span className="font-semibold"> {likes.length}</span>
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm">
              <span className="text-base font-semibold">{userName} </span>
              {content}
            </p>
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full py-0.5 border-none rounded text-sm pl-2"
            />
          </div>
        </div>
      </div>
    </div>
    );
};

export default PostCard;