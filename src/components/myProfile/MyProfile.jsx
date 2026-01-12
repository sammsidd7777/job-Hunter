import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery, useLogoutUserMutation } from "../../RTK/AuthService";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

import Application from "./semiComponent/Application";
import Notification from "./semiComponent/Notification";
import DashboardMain from "./semiComponent/DashboardMain";
import SavedJobs from "./SavedJob";
import navLogo from "../../../public/favicon.png";

const Myprofile = () => {
  const { data: user, isLoading } = useGetProfileQuery();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleLogout = async () => {
    await logoutUser().unwrap();
    dispatch(logout());
    navigate("/");
  };

  if (isLoading)
    return (
      <p className="text-center mt-10 text-gray-700 dark:text-gray-200">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      
      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 px-6 py-8 flex flex-col">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden shadow-md group-hover:scale-105 transition">
            <img src={navLogo} alt="JobHunter" className="w-full h-full object-cover" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Job<span className="text-blue-600">Hunter</span>
          </span>
        </Link>

        {/* MENU */}
        <nav className="space-y-2 flex-1 text-sm">
          <button
            onClick={() => { setSelectedMenu("dashboard"); setOpenDropdown(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${
              selectedMenu === "dashboard"
                ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            Dashboard <span>›</span>
          </button>

          <div>
            <button
              onClick={() => { setSelectedMenu("applications"); setOpenDropdown(!openDropdown); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${
                selectedMenu === "applications"
                  ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              }`}
            >
              Applications <span>▾</span>
            </button>
          </div>

          <button
            onClick={() => { setSelectedMenu("Saved-job"); setOpenDropdown(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${
              selectedMenu === "Saved-job"
                ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            Saved Jobs <span>›</span>
          </button>

          <button
            onClick={() => { setSelectedMenu("notifications"); setOpenDropdown(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl ${
              selectedMenu === "notifications"
                ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
            }`}
          >
            Notifications <span>›</span>
          </button>
        </nav>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-3 rounded-xl text-sm bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-800 transition"
        >
          Logout
        </button>
      </aside>

      {/* ================= MAIN DASHBOARD ================= */}
      <main className="flex-1 p-6">
        {selectedMenu === "applications" && <Application />}
        {selectedMenu === "notifications" && <Notification />}
        {selectedMenu === "dashboard" && <DashboardMain />}
        {selectedMenu === "Saved-job" && <SavedJobs />}
      </main>
    </div>
  );
};

export default Myprofile;
