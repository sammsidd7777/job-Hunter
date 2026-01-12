import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../Forms/Login";
import Register from "../Forms/Register";

const AuthPage = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  function registerUser () {
    setIsLogin(true);
    console.log(setIsLogin,"auth")
    
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto relative p-6 md:p-8">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
      >
        <IoClose size={22} />
      </button>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isLogin ? "Welcome Back 👋" : "Create Your Account"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {isLogin
            ? "Login to continue your journey"
            : "Sign up to get started"}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Login  onClose={onClose}/>
            <p className="text-gray-600 mt-4 text-center">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-blue-600 font-medium hover:underline focus:outline-none"
              >
                Register
              </button>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
          >
            <Register changeTologin={registerUser} />
            <p className="text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-blue-600 font-medium hover:underline focus:outline-none"
              >
                Login
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;
