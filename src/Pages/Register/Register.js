import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ButtonSpineer from "../../components/Spineers/ButtonSpineer";
import ImgSpineer from "../../components/Spineers/ImgSpineer";
import { AuthContext } from "../../Context/Context";
import Google from "../../images/google.png";

const Register = () => {
  const { setUser, usersRegister, userUpdate } = useContext(AuthContext);

  const [imgPreview, setImgPreview] = useState(
    "https://i.ibb.co/PjP8H1V/Untitled-1-01.png"
  );
  const [imgLoading, setImgLoading] = useState(false);
  const [userImage, setUserImage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //User dispaly user input image and uploadt to database
  const handleImg = (e) => {
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
        setUserImage(data.data.display_url);
        setImgLoading(false);
        console.log(data.data.display_url);
      });
  };

  //User register
  const handleRegister = (data) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;

    console.log(name, email, password);

    setLoading(true);
    usersRegister(email, password)
      .then((result) => {
        const user = result.user;

        const insertUser = {
          name,
          email,
          img: userImage,
        }
        userUpdate(name, userImage)
          .then(() => {
            //Adding user to database
            fetch(`http://localhost:5000/addUsers`, {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(insertUser)
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                setUser(user);
                console.log(user);
                toast.success("You are now registered");
                setLoading(false);
                reset();
                setImgPreview("https://i.ibb.co/PjP8H1V/Untitled-1-01.png");
                navigate("/");
              });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Oops something went wrong");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="w-96 mt-5 mb-5">
      <div className="max-w-md p-8 space-y-3 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-primary">Sign up</h1>
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="label">
              {errors.name ? (
                <span className="label-text text-red-500">
                  Name is required
                </span>
              ) : (
                <span className="label-text">Name</span>
              )}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              className="input input-bordered input-primary w-full max-w-xs"
              {...register("name", { required: true, maxLength: 20 })}
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="label">
              {errors.email ? (
                <span className="label-text text-red-500">
                  Email is required
                </span>
              ) : (
                <span className="label-text">Email</span>
              )}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs"
              {...register("email", { required: true })}
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="label">
              {errors.password ? (
                <span className="label-text text-red-500">
                  {errors.password?.message}
                </span>
              ) : (
                <span className="label-text">Password</span>
              )}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full max-w-xs"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[0-9])(.*[a-z])/,
                  message:
                    "Password must contain at least one uppercase letter and one lowercase letter",
                },
              })}
            />
          </div>
          <div className="mr-4 mx-auto">
            <label htmlFor="inputImg" type="" className="relative mx-auto">
              <img
                src={imgPreview}
                alt="input image"
                className="mx-auto w-28 border rounded-md border-dashed cursor-pointer"
              />
              {imgLoading && <ImgSpineer />}
            </label>
            <input
              type="file"
              name="inputImg"
              id="inputImg"
              className="hidden"
              accept="image/*"
              onChange={handleImg}
            />
          </div>
          <button className="btn btn-primary w-full">
            {loading ? <ButtonSpineer /> : "Sign up"}
          </button>
        </form>
        <div className="divider">OR</div>
        <div className="flex justify-center space-x-4">
          <button aria-label="Log in with Google" className="p-3 rounded-sm">
            <img src={Google} className="w-10" alt="" />
          </button>
        </div>
        <p className="text-sm text-center sm:px-6">
          Already have an account?
          <Link
            rel="noopener noreferrer"
            to={'/login'}
            className="underline text-primary"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
