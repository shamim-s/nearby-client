import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
import { useForm } from "react-hook-form";
import ImgSpineer from "../../../components/Spineers/ImgSpineer";

const CreatePostSection = () => {
  const [imgPreview, setImgPreview] = useState(
    "https://i.ibb.co/PjP8H1V/Untitled-1-01.png"
  );
  const [imgLoading, setImgLoading] = useState(false);
  const [postImg, setPostImg] = useState("");
  const { register, handleSubmit } = useForm();

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
    console.log(img, content);
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
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostSection;
