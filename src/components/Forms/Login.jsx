import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../RTK/AuthService";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");

  const [isLoading, setLoading] = useState(false)


  const [loginUser] = useLoginUserMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const onSubmit = async (data) => {

    setLoading(true)
    setMessage("");

    try {
      const res = await loginUser(data).unwrap();

      if (res) {

        console.log(res?.user,"login time")
        
        dispatch(setCredentials({ user:res?.user, token: res.token }));

        
        
        if (res?.user?.role == "hr") {
          console.log(res?.user?.role,"res?.user?.role")
          navigate("/hr/dashboard")
        } else {
          navigate("/")
        }
        onClose();

      }




    } catch (err) {
      console.log(err, "error")
      setMessage(err.response?.data?.message || err?.response?.message);
      setLoading(false)

    } finally {

    }
  };

  return (
    <div className="flex items-center justify-center  bg-gradient-to-br to-indigo-100 rounded-2xl">
      <div className="w-full max-w-md   p-8 rounded-2xl  ">



        {/* Message */}
        {message && (
          <div
            className={`text-center mb-4 py-2 px-3 rounded-md text-sm font-medium transition ${message.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
              }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-400 transition"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-400 transition"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-sm transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>

  );
};

export default Login;
