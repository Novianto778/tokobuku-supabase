import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import book from "../../assets/img/book.png";
import logo from "../../assets/img/logo-text.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "services/supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "store/userSlice";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const location = useLocation();
  const { user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const redirectPath = location.state?.path || "/";
  const submitForm = async (data) => {
    try {
      await dispatch(signInUser(data));
    } catch (err) {
      console.log(err);
    } finally {
      navigate(redirectPath);
    }
  };

  // useEffect(() => {
  //   if(user) navigate("/");
  // }, []);

  return (
    <div className="flex min-h-[100vh] h-full max-w-[1400px]">
      <div className="flex-[3]">
        <div className="max-w-md py-10 mx-auto">
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
            <div className="divider text-gray-400 text-sm">
              Or Login with Email
            </div>
            <p className="text-sm text-red-400">{error}</p>
            <form onSubmit={handleSubmit(submitForm)}>
              <Input
                {...register("email")}
                spacing={6}
                label="Email"
                type="text"
                placeholder="Enter your email"
                color="yellow-400"
                name="email"
                errors={errors.email?.message}
              />

              <Input
                {...register("password")}
                spacing={6}
                label="Password"
                type="password"
                placeholder="Enter your password"
                color="yellow-400"
                name="password"
                errors={errors.password?.message}
              />

              <Link
                to="/"
                className="font-medium text-sm text-right mt-4 text-primary block"
              >
                Forget Password?
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-400 w-full rounded-full mt-6"
              >
                Login
              </button>
              <p className="text-center mt-2">
                Don't have an account?{" "}
                <Link className="text-yellow-400 font-semibold" to="/signup">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className="md:block flex-[2] hidden bg-yellow-400 h-auto overflow-x-hidden">
        <div className="h-screen w-full relative overflow-hidden">
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
          <img
            src={book}
            alt=""
            className="w-96 absolute bottom-0 -right-8 z-50"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
