import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import ButtonSpineer from '../../components/Spineers/ButtonSpineer';
import { AuthContext } from '../../Context/Context';
import Google from '../../images/google.png';

const Login = () => {
    const {setUser, userLogin} = useContext(AuthContext);
    const {register, handleSubmit, formState:{errors}, reset} = useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (data) => {
      console.log(data);

      setLoading(true);
      const email = data.email;
      const password = data.password;

      userLogin(email, password)
      .then(result => {
        const user = result.user;
        setUser(user);
        setLoading(false);
        reset();
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        toast.success('Login Success');
        setLoading(false);
      })

    }

    return (
        <div className="w-96 mt-5 mb-5">
      <div className="max-w-md p-8 space-y-3 rounded-xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-primary">Sign in</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
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
              })}
            />
          </div>
          <button className="btn btn-primary w-full">
            {loading ? <ButtonSpineer /> : "Sign in"}
          </button>
        </form>
        <div className="divider">OR</div>
        <div className="flex justify-center space-x-4">
          <button aria-label="Log in with Google" className="p-3 rounded-sm">
            <img src={Google} className="w-10" alt="" />
          </button>
        </div>
        <p className="text-sm text-center sm:px-6">
          Don't have an account?
          <Link
            rel="noopener noreferrer"
            to={'/register'}
            className="underline text-primary"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
    );
};

export default Login;