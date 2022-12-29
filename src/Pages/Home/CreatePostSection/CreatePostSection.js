import { format } from "date-fns";
import React, { useContext, useState } from "react";
import ReactFileReader from "react-file-reader";
import { useForm } from "react-hook-form";
import ButtonSpineer from "../../../components/Spineers/ButtonSpineer";
import ImgSpineer from "../../../components/Spineers/ImgSpineer";
import { AuthContext } from "../../../Context/Context";

const CreatePostSection = () => {
  const {user} = useContext(AuthContext);
  const [imgPreview, setImgPreview] = useState(
    "https://i.ibb.co/PjP8H1V/Untitled-1-01.png"
  );

  const [imgLoading, setImgLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [postImg, setPostImg] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const date = format(new Date(), 'PP');

  //Image preview after selection any image and uploading to imgBB
  const handleInputImg = (e) => {
    setImgLoading(true);
    const image = e.target.files[0];
    setImgPreview(URL.createObjectURL(e.target.files[0]));

    const formData = new FormData();
    formData.append("image", image);

    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPostImg(data.data.display_url);
        setImgLoading(false);
        console.log(data.data.display_url);
      });
  };

  //uploading full post to database
  const handlePost = ( data) => {
    const img = postImg;
    const content = data.message;

    const postData = {
      img,
      content,
      userImg: user.photoURL,
      userName: user.displayName,
      userEmail: user.email,
      date,
    };
    setPostLoading(true);
    fetch(`http://localhost:5000/user/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setImgPreview("https://i.ibb.co/PjP8H1V/Untitled-1-01.png");
      reset();
      setPostLoading(false);
    })
    console.log(postData);
  }
  return (
    <div className="mt-4 bg-white shadow-lg rounded-md p-4 w-96">
      <h1 className="text-md font-semibold mb-4">Write a post?</h1>
      <form onSubmit={handleSubmit(handlePost)}>
        <div className="flex justify-center items-center ">
          <div className="mr-4">
            <label htmlFor="inputImg" type="" className="relative">
              <img
                src={imgPreview}
                alt="input image"
                className="w-28 border rounded-md border-dashed cursor-pointer"
              />
              {imgLoading && <ImgSpineer />}
            </label>
            <input
              type="file"
              name="inputImg"
              id="inputImg"
              className="hidden"
              accept="image/*"
              onChange={handleInputImg}
            />
          </div>
          <div className="">
            <textarea
              name="message"
              className="textarea textarea-primary"
              placeholder="Write"
              {...register("message", { required: true })}
            ></textarea>
          </div>
        </div>
        <button type="submit" className="btn btn-md btn-primary w-full mt-2">
          {
            postLoading ? <ButtonSpineer/> : 'Post'
          }
        </button>
      </form>
    </div>
  );
};

export default CreatePostSection;
