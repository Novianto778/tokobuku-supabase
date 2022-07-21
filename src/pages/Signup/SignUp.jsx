import React, { useState } from "react";
import book from "../../assets/img/book.png";
import logo from "../../assets/img/logo-text.svg";
import { Link } from "react-router-dom";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "services/supabaseClient";
import { useSelector } from "react-redux";
import SignupModal from "pages/Signup/SignupModal";

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { error } = useSelector((state) => state.user);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    const { email, password, username } = data;
    const { user } = await supabase.auth.signUp({ email, password });

    await supabase
      .from("profiles")
      .insert({ id: user.id, username }, { returning: "minimal" });
    setEmail(email);
    setOpenModal(true);
    reset();
  };

  return (
    <>
      {openModal && <SignupModal email={email} setOpenModal={setOpenModal} />}
      <div className="flex min-h-[100vh] h-full max-w-[1400px]">
        <div className="flex-[3]">
          <div className="max-w-md py-10 mx-auto">
            <h1 className="font-bold text-xl">Sign Up</h1>
            <p className="text-gray-500">Register your account</p>
            <div className="mt-6">
              <p className="text-sm text-red-400">{error}</p>
              <form onSubmit={handleSubmit(submitForm)}>
                <Input
                  {...register("username")}
                  spacing={6}
                  label="Username"
                  type="text"
                  placeholder="Enter your username"
                  color="yellow-400"
                  name="username"
                  errors={errors.username?.message}
                />

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
                <Input
                  {...register("confirmPassword")}
                  spacing={6}
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  color="yellow-400"
                  name="confirmPassword"
                  errors={errors.confirmPassword?.message}
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
                  Sign Up
                </button>
                <p className="text-center mt-2">
                  Have an account?{" "}
                  <Link className="text-yellow-400 font-semibold" to="/login">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="md:block flex-[2] hidden bg-yellow-400 h-auto overflow-x-hidden">
          <div className="h-screen w-full relative overflow-hidden">
            <div className="absolute z-30 top-16 left-8">
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
              className="w-96 absolute bottom-0 -right-8 z-30"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
