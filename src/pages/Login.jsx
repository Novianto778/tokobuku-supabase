import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import book from "../assets/img/book.png";
import logo from "../assets/img/logo-text.svg";
import { Link } from "react-router-dom";
import Input from "../components/Input";
const Login = () => {
  return (
    <div className="flex h-screen max-w-[1400px] mx-auto">
      <div className="flex-[3]">
        <div className="max-w-md py-10">
          <h1 className="font-bold text-xl">Login</h1>
          <p className="text-gray-500">Sign in to your account</p>
          <div className="mt-4">
            <button className="px-6 py-2 bg-white shadow-sm w-full border-2 rounded-full flex items-center justify-center">
              <span>
                <FcGoogle />
              </span>
              <span className="text-medium ml-4">Sign In with Google</span>
            </button>
            <button className="px-6 py-2 mt-2 bg-white shadow-sm w-full border-2 rounded-full flex items-center justify-center">
              <span>
                <FaFacebook style={{ fill: "#4267B2" }} />
              </span>
              <span className="text-medium ml-4">Sign In with Facebook</span>
            </button>
          </div>
          <div className="mt-6">
            <div className="divider text-gray-400 text-sm">Or Login with Email</div>
            <form action="">
              <Input
                spacing={6}
                label="Email"
                type="text"
                placeholder="Enter your email"
                color="yellow-400"
              />
              <Input
                spacing={6}
                label="password"
                type="password"
                placeholder="Enter your password"
                color="yellow-400"
              />
              
              <Link
                to="/"
                className="font-medium text-sm text-right mt-4 text-primary block"
              >
                Forget Password?
              </Link>
              <button className="px-6 py-2 bg-yellow-400 w-full rounded-full mt-6">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="md:block flex-[2] hidden">
        <div className="bg-yellow-400 h-screen w-full relative overflow-hidden">
          <div className="absolute z-50 top-16 left-8">
            <h4 className="text-3xl text-black font-bold">Welcome back</h4>
            <h4 className="text-3xl text-black font-bold inline-block">to</h4>
            <img
              src={logo}
              alt=""
              className="inline-block align-bottom h-10 ml-2"
            />
          </div>
          {/* <img src={pattern} alt="" className="bg-cover w-full h-screen opacity-30" /> */}
          <img src={book} alt="" className="w-96 absolute bottom-0 -right-8" />
        </div>
      </div>
    </div>
  );
};

export default Login;
