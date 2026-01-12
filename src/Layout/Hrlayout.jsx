import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useLogoutUserMutation } from "../RTK/AuthService";
import useLogout from "../hook/useLogout";
import logo from "../../public/favicon.png";
import { Building2 } from "lucide-react";

const HRLayout = () => {
  const location = useLocation();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const { handleLogout } = useLogout();

  const menuItem = (path, label, icon) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
          ${
            isActive
              ? "bg-purple text-white "
              :   "bg-white text-purple-700 shadow-md"
          }
        `}
      >
        <span className="text-lg">{icon}</span>
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-72 h-full  bg-gradient-to-t from-blue-600 to-purple-600 flex flex-col justify-between px-6 py-8">

        {/* TOP */}
        <div className="space-y-8">
          {/* LOGO */}
          <div className="flex items-center gap-3 bg-black/30 px-4 py-3 rounded-xl backdrop-blur">
            <img src={logo} alt="Job Hunter Logo" className="h-12 invert" />
            <h1 className="text-xl text-white font-semibold">
              Job Hunter
            </h1>
          </div>

          {/* MENU */}
          <nav className="space-y-2">
            {menuItem("/hr/dashboard", "Dashboard", "📄")}
            {menuItem("/hr/add-job", "Add Job", "➕")}
            {menuItem("/hr/shortlisted", "Shortlisted", "⭐")}
            {menuItem("/hr/interviews", "Interviews", "🎤")}
            {menuItem("/hr/messages", "Messages", "💬")}
            {menuItem("/hr/statistics", "Statistics", "📊")}
{menuItem("/hr/company", "Company Profile", <Building2 size={18} />)}

          </nav>
        </div>

        {/* LOGOUT */}
     <button
  onClick={handleLogout}
  disabled={isLoading}
  className="
    group relative w-full
    flex items-center gap-3
    rounded-xl px-4 py-3
    bg-white/90 backdrop-blur
    text-purple-700 font-semibold
    shadow-md transition-all duration-300
    
  "
>
  {/* Tooltip */}
  <span
    className="
      pointer-events-none
      absolute left-full top-1/2 ml-3
      -translate-y-1/2 translate-x-2
      whitespace-nowrap rounded-lg
      bg-black px-3 py-1.5
      text-xs text-white shadow-lg
      opacity-0
      transition-all duration-300
      group-hover:opacity-100 group-hover:translate-x-0
    "
  >
    Are you sure you want to logout?
  </span>

  {/* Icon */}
  <span className="text-xl">
    {isLoading ? "⏳" : "🚪"}
  </span>

  {/* Text */}
  <span>
    {isLoading ? "Logging out..." : "Logout"}
  </span>
</button>




      </aside>

      {/* MAIN CONTENT (SCROLLS INTERNALLY) */}
   <main className="flex-1 bg-gray-50 p-6 overflow-x-hidden overflow-y-auto">
  <Outlet />
</main>


    </div>
  );
};

export default HRLayout;
