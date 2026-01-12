import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import navLogo from "../../../public/favicon.png";
import { IoMenuSharp, IoClose } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { LogOutIcon } from "lucide-react";

import AuthPage from "../Auth/AuthPage";
import ThemeToggle from "../Theme/toggleTheme";
import { logout } from "../../redux/authSlice";
import { useLogoutUserMutation } from "../../RTK/AuthService";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginCard, setIsLoginCard] = useState(false);

  const user = useSelector((state) => state.auth.user);
  

  console.log(user,"header user")

const [logoutUser]=useLogoutUserMutation();

 const dispatch = useDispatch();

  /* ================= Logout ================= */
  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
    navigate("/");
  };

  const navLinks = [
    { name: "Find Jobs", path: "/find-jobs" },
    { name: "Companies", path: "/companies" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl shadow-md border-b border-gray-200 dark:border-gray-700">
        <nav className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* ================= Logo ================= */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
              <img
                src={navLogo}
                alt="JobHunter"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Job<span className="text-blue-600">Hunter</span>
            </span>
          </Link>

          {/* ================= Desktop Nav ================= */}
          <ul className="hidden md:flex items-center gap-10 text-lg font-medium">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative pb-1 transition ${
                      isActive
                        ? "text-blue-600 font-semibold after:w-full"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 after:w-0"
                    } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-blue-600 after:transition-all`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ================= Desktop Right ================= */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/my-profile">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition">
                    Profile <FaRegUserCircle />
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow hover:scale-105 transition"
                >
                  Logout <LogOutIcon size={18} />
                </button>

                <ThemeToggle />
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginCard(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold shadow hover:scale-105 transition"
                >
                  Login / Sign Up <IoMdLogIn />
                </button>
                <ThemeToggle />
              </>
            )}
          </div>

          {/* ================= Mobile Toggle ================= */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            {isMenuOpen ? <IoClose size={22} /> : <IoMenuSharp size={22} />}
          </button>
        </nav>

        {/* ================= Mobile Menu ================= */}
        <div
          className={`md:hidden origin-top transition-transform duration-300 ${
            isMenuOpen ? "scale-y-100" : "scale-y-0"
          }`}
        >
          <div className="px-6 py-4 space-y-4 bg-white dark:bg-gray-900 shadow">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600"
              >
                {item.name}
              </NavLink>
            ))}

            {user ? (
              <>
                <Link to="/my-profile">
                  <button className="w-full py-2 rounded-xl bg-indigo-500 text-white font-semibold">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded-xl bg-red-500 text-white font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsLoginCard(true);
                }}
                className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= Auth Modal ================= */}
      {isLoginCard && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
          <AuthPage onClose={() => setIsLoginCard(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
